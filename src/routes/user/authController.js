const { AuthService } = require("../../services/authService");
const { Token } = require("../../lib/token");
const token = new Token();
const { accounts } = require("../../model/account");
const jwt = require("jsonwebtoken");
const { Validation } = require("../../lib/validation");
const { send_email } = require("../../lib/sendEmail");
const { hashs } = require("../../model/hash");

module.exports = {

  registerUser: async function (req, res) {
    let pass = req.body.password
    let email = req.body.email
    let existing = await Validation.existToDB(email);
    if (existing == true) {
      res.status(406).send({
        status: "error",
        message: "There is an account with this email",
        data: {}
      })
    } else {
      let hashed = await AuthService.hashPassword(pass)
      let user = AuthService.addNewPerson(req.body, hashed);
      let userToken = token.generateToken({ email: user.email, id: user._id, permission: user.permission });
      userToken.then((token) => {
        send_email(
          "sendLink.html",
          (replacement = {
            name: req.body.fullname,
            link: `http://178.63.147.27:3000/accounts/verify?token=${token}`,
          }),
          req.body.email,
          "Verify your account"
        );
        res.status(201).send({
          status: "Ok",
          message:
            "please verify your account by follow the link that sent to your email address",
          data: {}
        });
      })
    }
  },

  loginUser: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let p = AuthService.loginCheck(email, password);
    p.then(async (message) => {
      console.log(message)
      let userToken = await token.generateToken({ email: message.email, id: message._id, permission: message.permission }).then((data) => {
        return data;
      }).catch((error) => { throw error });
      res.status(200).send({
        status: "Ok",
        message: "welcome to your page",
        data: {
          token: userToken,
        },
      });

    }).catch((message) => {
      if (message == 403) {
        res.status(403).send({
          status: "error",
          message: "your account is deactivated.verify your account",
          data: {},
        });
      } else {
        res.status(401).send({
          status: "error",
          message: "email or password is wrong",
          data: {},
        });
      }
    });
  },

  verifyUser: (req, res, next) => {
    const user_token = req.query.token;
    let p = token.verifyToken(user_token);
    p.then(async (message) => {
      AuthService.find_Update(message.email, { status: "active" });
      return res.status(200).send({
        status: "Ok",
        message: "set account to active",
        data: {},
      });
    }).catch((message) => {
      return res.status(406).send({
        status: "error",
        message: "the token is not correct or expired",
        data: {},
      });
    });
  },

  resetPass: async (req, res) => {
      let hash = await AuthService.hashPassword(req.body.password);
    let p = token.verifyToken(req.body.token);
    p.then(async (message) => {
      AuthService.find_Update(message.email, { password: hash })
      res.status(200).send({
        status: "Ok",
        message: "your password was reset successfully",
        data: {},
      })
    })
      .catch((message) => {
        res.status(406).send({
          status: "error",
          message: "the token was not correct or expired",
          data: {},
        });

      });   
    
  },


  getResetPass:async(req,res)=>{
    let findHash=await hashs.findOne({hash:req.query.hash});
    if(Date.now()-findHash.time_created >=172,800,000 ){
      res.status(404).send({
        status: "error",
        message: "hash has been expired.try again",
        data: {},
      });
    }
    else{
      res.status(200).send({
        status: "ok",
        message: "reset your password",
        data: {},
      });
    }
  },


  forgetPassword: async (req, res, next) => {
    const email = req.body.email;
    let user = await Validation.existToDB(email);
    if (user == true) {
      let randomHash = await AuthService.hashPassword("\\w+")
      AuthService.deleteHash(email);
      AuthService.addHash(email, randomHash);
      let userToken=await token.generateToken({email:email});
      console.log(userToken)
      send_email(
        "sendLink.html",
        (replacement = {
          name: user.fullname,
          link: `http://178.63.147.27:3000/accounts/reset-password?hash=${randomHash}`,
        }),
        email,
        "Reset password"
      );
      res.status(200).send({
        status: "200",
        message: "the message is sent to your email address",
        data: {
          token:userToken
        },
      });
    } else {
      res.status(404).send({
        status: "404",
        message: "email not found",
        data: {},
      });
    }
  },

  editProfile: async (req, res, next) => {
    let user=await accounts.findOne({email:req.decoded.email});
    let hashPass =
      req.body.password.length < 8
        ? user.password
        : await AuthService.hashPassword(req.body.password);

    console.log(hashPass)  
    let fullname = req.body.fullname.trim().length<=0 ? user.fullname : req.body.fullname;
    AuthService.find_Update(req.decoded.email, {
      fullname: fullname,
      password: hashPass,
    });

    res.status(200).send({
      status: "Ok",
      message: "your profile is updated",
      data: {},
    });

  },
};
