const { Validation } = require("../../lib/validation");
const registerController = require("./registerController")
const router = require('express').Router();

module.exports = (app)=> {
  router.post(
    "/register" , 
  
    registerController.verifyEmail
  )


  app.use("/accounts", router)

}