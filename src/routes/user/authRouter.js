const express = require("express");
const router = express.Router();
const authController = require("./authController");
const { MiddleWare } = require("../../lib/middleware");
const { auth } = require("google-auth-library");


router.post(
  "google-signup" ,
  authController.googleVerify
)


router.post(
  "/auth",
  [MiddleWare.emptyCheck, MiddleWare.mailCheck, MiddleWare.passwordCheck],
  authController.loginUser
);

router.get(
  "/verify", 
  authController.verifyUser
);

router.post(
  "/forget-password",
  [MiddleWare.emptyCheck, MiddleWare.mailCheck],
  authController.forgetPassword
);

router.post(
  "/register" , 
[MiddleWare.emptyCheck,MiddleWare.mailCheck,MiddleWare.passwordCheck,MiddleWare.confirmPassCheck],
  authController.registerUser
);

router.post(
  "/reset-password",
  authController.resetPass
); 

router.post(
  "/edit-profile",
  [MiddleWare.existToken, MiddleWare.confirmPassCheck],
  authController.editProfile
);



module.exports = router;
