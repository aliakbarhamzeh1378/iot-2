const express = require("express");
const router = express.Router();
const authController = require("./authController");
const { MiddleWare } = require("../../lib/middleware");

router.post(
  "/auth",
  [MiddleWare.emptyCheck, MiddleWare.mailCheck, MiddleWare.passwordCheck],
  authController.loginUser
);

router.get("/verify", authController.verifyUser);

router.post(
  "/forget-password",
  [MiddleWare.emptyCheck, MiddleWare.mailCheck],
  authController.forgetPassword
);

// router.get("/reset-password", authController.reset_password_get);

// router.post(
//   "/reset-password",
//   [MiddleWare.passwordCheck,MiddleWare.confirmPassCheck],
//   authController.reset_password_post
// );

router.post(
  "/edit-profile",
  [MiddleWare.existToken, MiddleWare.confirmPassCheck],
  authController.editProfile
);



module.exports = router;
