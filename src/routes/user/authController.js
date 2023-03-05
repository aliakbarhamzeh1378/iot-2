const { AuthService } = require("../../services/authService");
const { Token } = require("../../lib/token");
const token = new Token();
const { accounts } = require("../../model/account");
const jwt = require("jsonwebtoken");
const { Validation } = require("../../lib/validation");
const { send_email } = require("../../lib/sendEmail");
const { hashs } = require("../../model/hash");

module.exports = {
  loginUser: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let p = AuthService.loginCheck(email, password);
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

  forgetPassword: async (req, res, next) => {
    const email = req.body.email;
    let user = await Validation.existToDB(email);
    // console.log(user);
    if (user) {
      let randomHash = await AuthService.hashPassword("\\w+");
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

  //   reset_password_get: async(req, res, next) => {
  //     const hash = req.query.hash;
  //     let user=await hashs.findOne({ hash: hash })
  //     if (user) {
  //       let notExpire = AuthService.checkExpiration(user.time_created);
  //       if (notExpire) {
  //         let userToken = token.generateToken({ email: user.email });
  //         await hashs.deleteOne({ hash: hash });
  //         res.status(200).send({
  //           status: "200",
  //           message: userToken,
  //           data: {},
  //         });
  //       } else {
  //         res.status(404).send({
  //           status: "404",
  //           message: "hash is expired.try again",
  //           data: {},
  //         });
  //       }
  //     } else {
  //       res.status(404).send({
  //         status: "error",
  //         message: "not found",
  //         data: {},
  //       });

  //   };
  // },

  // reset_password_post:async (req, res, next) => {
  //   let hash = await AuthService.hashPassword(req.body.password);
  //   let p = token.verifyToken(req.body.token);
  //   p.then(async (message) => {
  //     AuthService.find_Update(message.email,{ password: hash })

  //     res.status(200).send({
  //       status: "Ok",
  //       message: "your password was reset successfully",
  //       data: {},
  //     });
  //   }).catch((message) => {
  //     res.status(406).send({
  //       status: "error",
  //       message: "the token was not correct or expired",
  //       data: {},
  //     });
  //   });
  // }

  editProfile: async (req, res, next) => {
    let user_token = req.headers["authorization"];
    let decodedToken = token.verifyToken(user_token);
    decodedToken
      .then(async (message) => {
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
};
