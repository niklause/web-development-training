const express = require("express");
const bodyParser = require("body-parser");
const zod = require("zod");
const jwtOperator = require("jsonwebtoken");
const mongooseConnector = require("mongoose");
const moment = require("moment");

const app = express();
const port = 3003;
const timestamp = moment.now();
const mongoConnectionString =
  "mongodb+srv://mahadikvinayak75:G5s9KGPTdYfXGJLT@cluster0.0wt0wpv.mongodb.net/user_app";

const userRecordMongoSchema = mongooseConnector.model("users", {
  username: String,
  password: String,
  name: String,
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

//Middleware to connect to the mongo DB
const getMongoConnection = (req, res, next) => {
  mongooseConnector
    .connect(mongoConnectionString)
    .then(() => {
      console.log("Mongo connection established successfully");
      next();
    })
    .catch((error) => {
      console.error("Mongo connection failed to establish ", error);
      res.status(500).send({
        status: "failed",
        error: "mongo connection failed",
      });
    });
};

//Middleware to check if the user already exists
const getExistingUser = async (req, res, next) => {
  const { username, password, name } = req.body;
  try {
    const existingUser = await userRecordMongoSchema.findOne({
      username: username,
    });
    if (!existingUser) {
      next();
    } else {
      res.status(400).send({
        error: "user already exists",
        code: "USER ALREADY EXIST",
      });
    }
  } catch (error) {
    console.error("get existing user failed with ", error);
    res.status(500).send(error);
  }
};

//Middleware to add a record into the mongo DB
const addMongoRecord = async (req, res, next) => {
  const { username, password, name } = req.body;
  try {
    const data = new userRecordMongoSchema({
      username: username,
      password: password,
      name: name,
    });
    const transaction = await data.save();
    if (transaction) {
      res.status(200).send({
        status: "success",
      });
    } else {
      res.status(400).send({
        status: "failed",
      });
    }
  } catch (error) {
    console.error("add mongo record failed with ", error);
    res.status(500).send(error);
  }
};

//Middleware to delete a record
const deleteMongoRecord = async (req, res, next) => {
  try {
    const { username } = req.body;
    const transaction = await userRecordMongoSchema.findOneAndDelete({
      username: username,
    });
    if (transaction) {
      res.status(200).send({
        status: "success",
      });
    } else {
      res.status(400).send({
        status: "failed",
      });
    }
  } catch (error) {
    console.error("delete mongo record failed with ", error);
    res.status(500).send(error);
  }
};

//Middleware to update a record
const updateMongoRecord = async (req, res, next) => {
  const { username } = req.body;
  const { name, password } = req.query;
  try {
    const transaction = await userRecordMongoSchema.findOneAndUpdate(
      { username: username },
      { $set: { name: name, password: password } }
    );
    if (transaction) {
      res.status(200).send({
        status: "success",
      });
    } else {
      res.status(400).send({
        status: "failed",
      });
    }
  } catch (error) {
    console.error("update mongo record failed with ", error);
    res.status(500).send(error);
  }
};

//Middleware to retrieve a record
const getUser = async (req, res, next) => {
  const { username } = req.query;
  try {
    const data = await userRecordMongoSchema.findOne({ username: username });
    if (data) {
      const { username, name } = data;
      res.status(200).send({
        status: "success",
        data: {
          username,
          name,
        },
      });
    } else {
      res.status(400).send({
        status: "failed",
        data: "record not found",
      });
    }
  } catch (error) {
    console.error("Get user failed with ", error);
    res.status(500).send(error);
  }
};

app.get("/find/user", getMongoConnection, getUser);

app.post("/signup", getMongoConnection, getExistingUser, addMongoRecord);

app.put("/update/name", getMongoConnection, updateMongoRecord);

app.delete("/delete/record", getMongoConnection, deleteMongoRecord);

//Global Catch to handle global error
app.use((err, req, res, next) => {
  res.status(500).send({
    status: "failed",
    error: "unknown error occcurred",
  });
});

app.listen(port, () => {
  console.log("Application is listening to the ", port);
});
