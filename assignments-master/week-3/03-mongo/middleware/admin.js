const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { uuid } = require("uuidv4");
const secret = "mongo";

// Middleware for handling auth
module.exports.adminSignup = async function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const data = Admin({
      username: username,
      password: password,
    });
    const transaction = await data.save();
    if (transaction) {
      res.status(200).send({
        status: "admin registered successfully",
      });
    } else {
      res.status(400).send({
        status: "admin registration failed",
      });
    }
  } catch (error) {
    console.log("Admin signup failed with ", error);
    res.status(500).send(error);
  }
};

//Middleware for sign In
module.exports.adminSignin = async function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  try {
    let token = "";
    const data = await Admin.findOne({ username: username });
    if (data) {
      token = jwt.sign({ username: data.username }, secret);
    }
    if (token) {
      res.status(200).send({
        status: "success",
        token: token,
      });
    } else {
      res.status(400).send({
        status: "failed",
        error: "Sign in failed",
      });
    }
  } catch (error) {
    console.log("Admin signin failed with ", error);
    res.status(500).send({
      status: "failed",
      error: "Token decoding failed",
    });
  }
};

//Middleware to verify admin creds
module.exports.adminVerification = async function (req, res, next) {
  const token = req.headers.authorization;
  try {
    if (token) {
      const data = jwt.verify(token, secret);
      const { username } = data;
      const adminInfo = await Admin.findOne({ username: username });
      if (adminInfo) {
        next();
      } else {
        res.status(400).send({
          status: "Token processing failed",
        });
      }
    }
  } catch (error) {
    console.log("Admin verification failed with ", error);
    res.status(500).send({
      status: "failed",
      error: "Token decoding failed",
    });
  }
};

//Middleware to add the course
module.exports.addCourse = async function (req, res, next) {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageLink = req.body.imageLink;
  const published = req.body.published;

  try {
    const courseId = uuid();
    const data = Course({
      courseId,
      title,
      description,
      price,
      imageLink,
      published,
    });
    const transaction = await data.save();
    if (transaction) {
      res.status(200).send({
        status: "Course registered successfully",
      });
    } else {
      res.status(400).send({
        status: "Course registration failed",
      });
    }
  } catch (error) {
    console.log("Course registration failed with ", error);
    res.status(500).send(error);
  }
};

//Middleware to show the list of courses
module.exports.getCourses = async function (req, res, next) {
  try {
    const data = await Course.find();
    if (data && data.length > 0) {
      res.status(200).send({
        status: "success",
        data,
      });
    } else {
      res.status(400).send({
        status: "failed",
        error: "no records found",
      });
    }
  } catch (error) {
    console.log("Fetch courses failed with ", error);
    res.status(500).send(error);
  }
};
