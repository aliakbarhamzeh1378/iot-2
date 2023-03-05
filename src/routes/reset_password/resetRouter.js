let resetController = require("../reset_password/resetController")
const router = require('express').Router();


module.exports = (app)=>{
    router.post(
        "/reset-password",
        resetController.updatePass
    );
    app.use("/accounts", router)
}
