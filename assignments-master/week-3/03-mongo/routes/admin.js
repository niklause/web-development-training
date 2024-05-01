const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes

router.route("/signup").post(adminMiddleware.adminSignup);

router.route("/signin").post(adminMiddleware.adminSignin);

router
  .route("/add-course")
  .post(adminMiddleware.adminVerification, adminMiddleware.addCourse);

router
  .route("/courses")
  .get(adminMiddleware.adminVerification, adminMiddleware.getCourses);

module.exports = router;
