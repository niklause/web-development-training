const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;
let requestCounter = 0;
let time = 0;
let beforeTime = 0;
let afterTime = 0;
let avg = 0;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

const getBeforeTime = (req, res, next) => {
  const date = new Date();
  beforeTime = date.getTime();
  next();
};

const getAfterTime = (req, res, next) => {
  const date = new Date();
  AfterTime = date.getTime();
  next();
};

//Create an application level middleware to count the number of requests coming in
const getNumberOfRequest = (req, res, next) => {
  requestCounter = requestCounter + 1;
  next();
};

app.use(getNumberOfRequest, (req, res, next) => {
  const d1 = new Date();
  beforeTime = d1.getTime();
  console.log(`Total number of requests- ${requestCounter}`);
  next();
  const d2 = new Date();
  afterTime = d2.getTime();
  time = time + (AfterTime - beforeTime);
  avg = time / requestCounter;
});

const findPatient = (name, data) => {
  return data.filter((userData) => {
    return userData.name === name;
  })[0];
};

const users = [
  {
    name: "John",
    Kidneys: [
      {
        healthy: false,
      },
      {
        healthy: false,
      },
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
];

//Middleware Examples -firstMiddleware
const firstMiddleware = (req, res, next) => {
  console.log("Inside First Middleware==========================>");
  if (true) {
    next();
  }
};

//Middleware Examples -secondMiddleware
const secondMiddleware = (req, res, next) => {
  console.log("Inside Second Middleware==========================>");
  if (true) {
    next();
  }
};

//Get Request
//Example of request param
app.get("/kidney-status/:patient", (req, res) => {
  const patientName = req.params.patient ?? "";
  try {
    if (!patientName) {
      res.status(400).send({
        status: "Failed",
        error: "patient name mandatory",
      });
    }
    const foundPatient = findPatient(patientName, users);

    if (foundPatient) {
      const { name, Kidneys } = foundPatient;
      const totalKidneys = Kidneys.length;
      let totalunhealthyKidneys = 0;
      let totalhealthyKidneys = 0;

      if (name && Kidneys) {
        const unhealthyKidneys = Kidneys.filter((kidneyData) => {
          return !kidneyData.healthy;
        });
        totalunhealthyKidneys = unhealthyKidneys.length;
      }
      totalhealthyKidneys = totalKidneys - totalunhealthyKidneys;
      res.status(200).send({
        status: "Success",
        name,
        totalKidneys,
        totalhealthyKidneys,
        totalunhealthyKidneys,
        requestCounter,
        beforeTime,
        afterTime,
        time,
        avg,
      });
    } else {
      res.status(400).send({
        status: "Failed",
        error: "patient not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      error: "unknown error occurred",
    });
  }
});

//Post Request
app.post("/add/kidney", (req, res) => {
  const reqPayload = req.body;
  const { name, isHealthy } = reqPayload;
  try {
    const foundPatient = findPatient(name, users);

    if (foundPatient) {
      foundPatient.Kidneys.push({ healthy: isHealthy });
      res.status(200).send({
        status: "success",
        data: users,
        requestCounter,
        beforeTime,
        afterTime,
        time,
        avg,
      });
    } else {
      res.status(400).send({
        status: "Failed",
        error: "patient not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      error: "unknown error occurred",
    });
  }
});

//Put Request
app.put("/kidney/detox", (req, res) => {
  const reqPayload = req.body;
  const { name } = reqPayload;
  try {
    const foundPatient = findPatient(name, users);

    if (foundPatient) {
      foundPatient.Kidneys.map((kidney) => {
        return !kidney.healthy ? (kidney.healthy = true) : true;
      });
      res.status(200).send({
        status: "success",
        data: foundPatient,
        requestCounter,
        beforeTime,
        afterTime,
        time,
        avg,
      });
    } else {
      res.status(400).send({
        status: "Failed",
        error: "patient not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      error: "unknown error occurred",
    });
  }
});

//Delete Request
//Example of query param
app.delete("/complete/detox", (req, res) => {
  const name = req.query.patient;
  try {
    const foundPatient = findPatient(name, users);
    if (foundPatient) {
      const newArray = foundPatient.Kidneys.map((kidney) => {
        return kidney.healthy ? kidney : {};
      });
      foundPatient.Kidneys = newArray.filter((ele) => {
        if (ele.healthy) {
          return ele;
        }
      });
      res.status(200).send({
        status: "success",
        data: foundPatient,
        requestCounter,
        beforeTime,
        afterTime,
        time,
        avg,
      });
    } else {
      res.status(400).send({
        status: "Failed",
        error: "patient not found",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      error: "unknown error occurred",
    });
  }
});

//MiddleWare Example
app.get("/name", firstMiddleware, secondMiddleware, (req, res) => {
  res.json({
    requestCounter,
    beforeTime,
    afterTime,
    time,
    avg,
  });
});

app.listen(port, () => {
  console.log("Application is running on port ", port);
});
