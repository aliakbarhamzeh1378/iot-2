const { accounts } = require("../model/account");
const bcrypt = require("bcrypt");

class MiddleWare {
  static mailCheck(req, res, next) {
    const emailCheck = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
    if (!emailCheck.test(req.body.email)) {
      res.status(401).send({
        status: "error",
        message: "the email address is wrong",
      });
    } else next();
  };

  static hashPassword(password) {
    return new Promise((resolve , reject)=>{
        let newPass = password.toString();
        let salt = parseInt(bcrypt.genSalt(10));
        let hash = bcrypt.hash(newPass, salt);
        if(hash){
            resolve(hash)
        }else{
            reject("failed")
        }
    })
  };
  static emptyCheck(req, res, next) {
    let found = false;
    for (let key in req.body) {
      if (req.body[key].length == 0) {
        found = true;
        res.status(404).send({
          status: "error",
          message: "fill all fields",
        });
      }
      break;
    }
    if (!found) {
      next();
    }
  }

  static passwordCheck(req, res, next) {
    if (req.body.password.length < 8) {
      res.status(406).send({
        status: "error",
        message: "the password is very short.it must be at least 8 characters",
      });
    } else next();
  }

  static confirmPassCheck(req, res, next) {
    if (req.body.password != req.body.confirmPassword) {
      res.status(401).send({
        status: "error",
        message: "passwords that you entered do not matched",
      });
    } else next();
  }

  static existToken(req, res, next) {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) {
      return res.status(404).send({
        status: "error",
        message: "login to your account",
      });
    } else next();
  }
}

module.exports = { MiddleWare };
