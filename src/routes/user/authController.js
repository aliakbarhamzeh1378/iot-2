const { authService } = require("../../services/authService");
const { Token } = require("../../lib/token");
const token = new Token();
const { accounts } = require("../../model/account");
const jwt = require("jsonwebtoken");
const { Validation } = require("../../lib/validation");
const { send_email } = require("../../lib/sendEmail");
const { hashs } = require("../../model/hash");

module.exports = {

  verifyEmail : async function(req , res ){
    let pass = req.body.password
    let email=req.body.email
    let hashed = await authService.hashPassword(pass).toString();
    let exist=
    authService.addNewPerson(req.body , hashed);
    let usrToken = token.generateToken({email:email});
    usrToken.then((token)=>{
    send_email(
        "sendLink.html",
        (replacement = {
          name: req.body.fullname,
          link: `https://test.com/accounts/verify?token=${token}`,
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

  },

  loginUser: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let p = authService.loginCheck(email, password);
    p.then((message) => {
      if (message == 200) {
        let userToken = token.generateToken({ email: email });
        res.status(200).send({
          status: "Ok",
          message: "welcome to your page",
          data: {
            token: userToken,
          },
        });
      } else if (message == 403) {
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
    //verify token has a problem
    const user_token = req.query.token;
    let p = token.verifyToken(user_token);
    p.then(async (message) => {
      authService.find_Update(message.email, { status: "active" });
      res.status(200).send({
        //load verify.ejs
        status: "Ok",
        message: "set account to active",
        data: {},
      });
    }).catch((message) => {
      res.status(406).send({
        status: "error",
        message: "the token is not correct or expired",
        data: {},
      });
    });
  },

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

  forgetPassword: async (req, res, next) => {
    const email = req.body.email;
    let user = await Validation.existToDB(email);
    // console.log(user);
    if (user) {
      let randomHash = await authService.hashPassword("\\w+");
      authService.deleteHash(email);
      authService.addHash(email, randomHash);
      send_email(
        "sendLink.html",
        (replacement = {
          name: user.fullname,
          link: `https://test.com/accounts/reset-password?hash=${randomHash}`,
        }),
        email,
        "Reset password"
      );
      res.status(200).send({
        status: "200",
        message: "the message is sent to your email address",
        data: {},
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
    let user_token = req.headers["authorization"];
    let decodedToken = token.verifyToken(user_token);
    decodedToken
      .then(async (message) => {
        let hashPass =
          req.body.password.length < 8
            ? message.password
            : await authService.hashPassword(req.body.password);
        let fullname = null ? message.fullname :req.body.fullname ;
        authService.find_Update(message.email, {
          fullname: fullname,
          password: hashPass,
        });

        res.status(200).send({
          status: "Ok",
          message: "your profile is updated",
          data: {},
        });
      })
      .catch((message) => {
        res.status(404).send({
          status: "error",
          message: "token is incorrect or expired",
          data: {},
        });
      });
  },
};
