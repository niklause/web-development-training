const jwt = require("jsonwebtoken");
const { User } = require("../db");

const SECRET = "todo";

module.exports.isUserAlreadyExist = async (req, res, next) => {
  const username = req.body.username;
  try {
    const data = await User.findOne({ username: username });
    if (data) {
      res.status(400).send({
        status: "error",
        message: "user already exist",
      });
    } else {
      next();
    }
  } catch (error) {
    console.error("isUserAlreadyExist  failed with ", error);
    res.status(500).send(error);
  }
};

module.exports.userSignup = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const data = User({
      username: username,
      password: password,
    });

    const transaction = await data.save();
    if (transaction) {
      res.status(200).send({
        status: "success",
        message: "User registered successfully",
      });
    } else {
      res.status(400).send({
        status: "error",
        message: "User registration failed",
      });
    }
  } catch (error) {
    console.error("User registration failed with ", error);
    res.status(500).send(error);
  }
};

module.exports.userSignin = async (req, res, next) => {
  const username = req.headers.username;
  const password = req.headers.password;
  let token = "";
  try {
    const transaction = await User.find({
      username: username,
      password: password,
    });
    if (transaction.length > 0) {
      const usernameFound = transaction[0].username ?? "";
      if (usernameFound) {
        token = jwt.sign({ username: usernameFound }, SECRET);
        if (token) {
          res.status(200).send({
            status: "success",
            token,
          });
        }
      }
    } else {
      res.status(400).send({
        status: "error",
        message: "issues with creds",
      });
    }
  } catch (error) {
    console.error("User signup failed with ", error);
    res.status(500).send(error);
  }
};

module.exports.userVerification = async (req, res, next) => {
  const token = req.headers.authorization || "";
  try {
    const userData = jwt.verify(token, SECRET);
    const usernameFound = userData.username;
    const data = await User.findOne({ username: usernameFound });
    if (data) {
      req.username = usernameFound;
      next();
    } else {
      res.status(401).send({
        status: "error",
        message: "user is not authorized",
      });
    }
  } catch (error) {
    console.error("User verification failed with ", error);
    res.status(500).send(error);
  }
};
