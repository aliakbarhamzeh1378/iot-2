const { accounts } = require("../model/account");
const bcrypt = require("bcrypt");

class Validation {
  static mailCheck(req, res) {
    const emailCheck = new RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
    if (!emailCheck.test(req)) {
      res.status(401).send({
        status: "error",
        message: "the email address is wrong",
      });
    } 
  };

  static emptyCheck(req, res) {
    let found = false;
    for (let key in req) {
      if (req[key].length == 0) {
        found = true;
        res.status(404).send({
          status: "error",
          message: "fill all fields",
        });
      }
      break;
    }
  };

  static passwordCheck(req, res) {
    if (req.length < 8) {
      res.status(406).send({
        status: "error",
        message: "the password is very short.it must be at least 8 characters",
      });
    } 
  };

  static confirmPassCheck(pass1 , pass2 , res) {
    if ( pass1!= pass2) {
      res.status(401).send({
        status: "error",
        message: "passwords that you entered do not matched",
      });
    }
  };

  static async existToDB(req, res) {
    if ((await accounts.findOne({ email: req.body.email })) != null) {
      res.status(401).send({
        status: "error",
        message: "there is an account with this email address",
      });
    }
  };

  static async notExistToDB(req, res) {
    if ((await accounts.findOne({ email: req.body.email })) == null) {
      res.status(401).send({
        status: "error",
        message: "this email is not exist",
      });
    }
  }

  static hashPassword(password) {
    try {
      let newPass = password.toString();
      let salt = parseInt(bcrypt.genSalt(10));
      let hash = bcrypt.hash(newPass, salt);
      return hash;
    } catch {
      throw error;
    }
  }

  static async cmpPassWithDb(secret,password){
    let resualt=await bcrypt.compare(password,secret);
    return resualt;


  }
}

module.exports = { Validation };
