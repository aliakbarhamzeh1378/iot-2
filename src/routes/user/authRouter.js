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

router.post(
  "/register" , 

  registerController.verifyEmail
);

router.post(
  "/reset-password",
  resetController.updatePass
); 

router.post(
  "/edit-profile",
  [MiddleWare.existToken, MiddleWare.confirmPassCheck],
  authController.editProfile
);



module.exports = router;
