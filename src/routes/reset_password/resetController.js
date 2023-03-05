let resetService = require("../../services/authService");

module.exports = {
    updatePass : ((req,res)=>{
        console.log("hello")
        resetService.findAccount(req.body.password , req.body.token)
        .then((message)=>{
            res.status(200).send({
                status: "Ok",
                message: "your password was reset successfully",
                data: {},
              });
            })
        .catch((message) => {
            res.status(406).send({
                status: "error",
                message: "the token was not correct or expired",
                data: {},
            });
        });
    }),


}

