const express = require("express");
const router = express.Router();
const userMiddleware = require("../middlewares/user");

router
  .route("/signup")
  .post(userMiddleware.isUserAlreadyExist, userMiddleware.userSignup);

router.route("/signin").get(userMiddleware.userSignin);

module.exports = router;
