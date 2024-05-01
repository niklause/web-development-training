const { User, Course, CoursePurchase } = require("../db");
const jwt = require("jsonwebtoken");
const secret = "mongo";

module.exports.userSignUp = async function (req, res, next) {
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
        status: "user registered successfully",
      });
    } else {
      res.status(400).send({
        status: "user registration failed",
      });
    }
  } catch (error) {
    console.error("User Registration failed with generic error ", error);
    res.status(500).send(error);
  }
};

module.exports.userSignIn = async function (req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const data = await User.find({ username: username, password: password });
    let token = "";
    if (data && data.length > 0) {
      token = jwt.sign({ username: data[0].username }, secret);
      if (token) {
        res.status(200).send({
          status: "success",
          token,
        });
      }
    } else {
      res.status(400).send({
        status: "invalid account details",
      });
    }
  } catch (error) {
    console.error("User Sign in failed with ", error);
    res.status(500).send(error);
  }
};

module.exports.userVerification = async function (req, res, next) {
  const token = req.headers.authorization;
  try {
    const tokenData = jwt.verify(token, secret);
    if (tokenData && tokenData.username) {
      const data = await User.findOne({ username: tokenData.username });
      if (data) {
        next();
      } else {
        res.status(400).send({
          status: "error",
          courses: "no user available",
        });
      }
    } else {
      res.status(400).send({
        status: "error",
        courses: "Invalid account details",
      });
    }
  } catch (error) {
    console.error("Admin verification failed with ", error);
    res.status(500).send(error);
  }
};

module.exports.availableCourses = async function (req, res, next) {
  try {
    const courses = await Course.find();
    if (courses.length > 0) {
      res.status(200).send({
        status: "success",
        courses: courses,
      });
    } else {
      res.status(400).send({
        status: "error",
        courses: "no courses available",
      });
    }
  } catch (error) {
    console.error("Fetch Courses failed with ", error);
    res.status(500).send(error);
  }
};

module.exports.purchaseCourse = async function (req, res, next) {
  const token = req.headers.authorization;
  const courseDataId = req.params.courseId;
  try {
    const tokenData = jwt.verify(token, secret);
    const data = await User.findOne({ username: tokenData.username });
    const { username } = data;
    const courseData = await Course.findOne({ courseId: courseDataId });
    if (courseData) {
      const data = await CoursePurchase.findOne({ username: username });
      console.log(data);
      if (data) {
        const { courseId } = data;
        const isAlreadyPurchased = courseId.filter((dataId) => {
          return dataId === courseDataId ? true : false;
        })[0];
        if (isAlreadyPurchased) {
          res.status(400).send({
            status: "Course already Purchased",
          });
        } else {
          const transaction = await CoursePurchase.updateOne(
            { username: username },
            { $push: { courseId: courseDataId } }
          );
          if (transaction) {
            res.status(200).send({
              status: "Course Purchased successfully",
              courseData,
            });
          } else {
            res.status(400).send({
              status: "Course Purchasing failed",
            });
          }
        }
      } else {
        const purchaseData = CoursePurchase({
          username: username,
          courseId: courseData.courseId,
        });
        const transaction = await purchaseData.save();
        if (transaction) {
          res.status(200).send({
            status: "Course Purchased successfully",
            courseData,
          });
        } else {
          res.status(400).send({
            status: "Course Purchasing failed",
          });
        }
      }
    } else {
      res.status(400).send({
        status: "Course not found",
      });
    }
  } catch (error) {
    console.error("Course Purchasing failed with ", error);
    res.status(500).send(error);
  }
};

module.exports.purchasedCourses = async function (req, res, next) {
  const token = req.headers.authorization;
  try {
    const tokenData = jwt.verify(token, secret);
    const data = await CoursePurchase.find({ username: tokenData.username });
    const { courseId, username } = data[0];
    if (!username && !courseId) {
      res.status(400).send({
        status: "You have not purchased any courses",
      });
    } else {
      const courseDetails = await Promise.all(
        courseId.map(async (element) => {
          const data = await Course.findOne({ courseId: element });
          if (data) {
            return {
              courseId: element,
              title: data.title,
            };
          }
        })
      );
      res.status(200).send({
        status: "success",
        courseDetails,
        username,
      });
    }
  } catch (error) {
    console.error("fetch Purchased courses failed with ", error);
    res.status(500).send(error);
  }
};
