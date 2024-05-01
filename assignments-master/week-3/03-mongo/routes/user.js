const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post("/signup", userMiddleware.userSignUp);

router.post("/signin", userMiddleware.userSignIn);

router.get(
  "/courses",
  userMiddleware.userVerification,
  userMiddleware.availableCourses
);

router.post(
  "/courses/:courseId",
  userMiddleware.userVerification,
  userMiddleware.purchaseCourse
);

router.get(
  "/purchasedCourses",
  userMiddleware.userVerification,
  userMiddleware.purchasedCourses
);

module.exports = router;
