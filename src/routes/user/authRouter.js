const express = require("express");
const router = express.Router();
const authController = require("./authController");
const { MiddleWare } = require("../../lib/middleware");
const passport=require("passport");
require("./googleAuth")

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

router.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
 

router.get('/google/callback', 
  passport.authenticate('google', { 
    successRedirect:"/protected",
    failureRedirect: '/auth/failure',

    
  }))

router.get("/auth/failure",authController.googleFailure)

router.get("/protected",MiddleWare.isLoggedIn,authController.googleLogin)

router.get("/logout",authController.googleLogout)

module.exports = router;
