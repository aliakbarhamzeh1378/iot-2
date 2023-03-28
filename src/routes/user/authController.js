const { AuthService } = require("../../services/authService");
const { Token } = require("../../lib/token");
const token = new Token();
const { accounts } = require("../../model/account");
const jwt = require("jsonwebtoken");
const { Validation } = require("../../lib/validation");
const { send_email } = require("../../lib/sendEmail");
const { hashs } = require("../../model/hash");


module.exports = {

  registerUser : async function(req , res ){
    let pass = req.body.password
    let email=req.body.email
    let existing = await Validation.existToDB(email);
    if(existing==true){
      res.status(406).send({
        status : "error",
        message : "There is an account with this email",
        data : {}
      })
    }else{
      let hashed = await AuthService.hashPassword(pass)
      AuthService.addNewPerson(req.body , hashed);
      let userToken = token.generateToken({email:email});
      userToken.then((token)=>{
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
    }
  },

  loginUser: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let p = AuthService.loginCheck(email, password);
    p.then(async(message) => {
      if (message == 200) {
        let userToken = await token.generateToken({ email: email }).then((data)=>{
          return data;
        }).catch((error)=>{throw error});
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
      AuthService.find_Update(message.email, { status: "active" });
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

    resetPass : async (req,res)=>{
      let hash=await AuthService.hashPassword(req.body.password);
      let p=token.verifyToken(req.body.token);
      p.then(async(message)=>{
        AuthService.find_Update(message.email,{password:hash})
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
          console.log(message)

      });
  },



    forgetPassword: async (req, res, next) => {
    const email = req.body.email;
    let user = await Validation.existToDB(email);
    if (user==true) {
      let randomHash = await AuthService.hashPassword("\\w+")
      AuthService.deleteHash(email);
      AuthService.addHash(email, randomHash);
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
    let decodedToken = token.verifyToken(user_token)
      .then(async (message) => {
        console.log(message)
        let hashPass =
          req.body.password.length < 8
            ? message.password
            : await AuthService.hashPassword(req.body.password);
        let fullname = null ? message.fullname :req.body.fullname ;
        AuthService.find_Update(message.email, {
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

  googleLogin:(req,res,next)=>{
    let userName=req.user.displayName;
    res.status(200).send({
      status:"ok",
      message:`Hello ${userName} \n successful login`,
      data:{},
    })
  },

  googleFail:(req,res,next)=>{
    res.status(404).send({
      status:"error",
      message:"something went wrong...",
      data:{}
      })
  },

  googleLogout:(req,res,next)=>{
    req.logOut();
    req.session.destroy();
    res.status(200).send({
      status:"ok",
      message:"GoodBye",
      data:{},
    })
  }
};
