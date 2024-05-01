const express = require("express");
const bodyParser = require("body-parser");
const jwtOperator = require("jsonwebtoken");
const fs = require("fs");
const zod = require("zod");
const path = require("path");

const app = express();
const port = 3002;
const fileName = "JWTKeyPassword.txt";
const filePath = path.join(__dirname, fileName);
let JWTKeyPassword = "";

const signinReqSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const jwtTokenValidationSchema = zod.string();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

//Middleware to fetch jwt signature key
const fetchJwtSignature = (req, res, next) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    JWTKeyPassword = data ?? "";
    next();
  } catch (error) {
    console.error("Fetch Jwt Signature failed with ", error);
    res.status(500).send(error);
  }
};

//Middleware which would check if the payload structure is accurate
const validateInput = (req, res, next) => {
  try {
    const reqPayload = req.body;
    const inputValidationResponse = signinReqSchema.safeParse(reqPayload);
    const { success } = inputValidationResponse;
    if (success) {
      next();
    } else {
      res.status(400).send({
        error: "Invalid Request data",
        code: "INVALID PAYLOAD",
      });
    }
  } catch (error) {
    console.error("Input Validation Failed with ", error);
    res.status(500).send(error);
  }
};

//Middleware which would check if the user exist or not
const isUserExist = (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = ALL_USERS.filter((user) => {
      return user.username === username && user.password === password;
    });
    return user.length === 1
      ? next()
      : res.status(400).send({
          error: "Account Details Not Found.",
          code: "Username Does not exist",
        });
  } catch (error) {
    console.error("User check failed with ", error);
    res.status(500).send(error);
  }
};

//Middleware which would tokenize the data
const generateJwtToken = (req, res, next) => {
  try {
    const { username } = req.body;
    let token = "";
    token = jwtOperator.sign({ username: username }, JWTKeyPassword, {
      expiresIn: "1h",
    });
    if (token) {
      res.status(200).send({
        status: "success",
        token,
      });
      next();
    } else {
      res.status(400).send({
        error: "Token generation failure",
        code: "Failed to generate token",
      });
    }
  } catch (error) {
    console.error("Token genration failed with ", error);
    res.status(500).send(error);
  }
};

//Middleware which would check if the header structure is accurate
const validateHeader = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const inputValidationResponse = jwtTokenValidationSchema.safeParse(token);
    const { success } = inputValidationResponse;
    if (success) {
      next();
    } else {
      res.status(400).send({
        error: "Invalid Header",
        code: "INVALID HEADER",
      });
    }
  } catch (error) {
    console.error("Header Validation Failed with ", error);
    res.status(500).send(error);
  }
};

const decodeJwtToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const data = jwtOperator.verify(token, JWTKeyPassword);
      return res.send({
        status: "success",
        fetchedDetails: {
          username: data.username,
        },
      });
    } else {
      res.status(400).send({
        error: "Token decoding failed",
        code: "TOKEN SIGNATURE ERROR",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//Create a route which would return a JWT for user
app.post(
  "/signin",
  fetchJwtSignature,
  validateInput,
  isUserExist,
  generateJwtToken
);

//Create a route which would return a logged in user by decoding a jwt token (header)
app.get("/user", fetchJwtSignature, validateHeader, decodeJwtToken);

app.listen(port, () => {
  console.log("App is listening is on port ", port);
});
