const {authService} = require("../../services/authService");
const {send_email} = require("../../lib/sendEmail");

async function verifyEmail(req , res ){
  let pass = req.body.password
    let hashed = await authService.hashPassword(pass).toString()
    authService.addNewPerson(req.body , hashed);
    let token = authService.generateToken(pass);
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
};
module.exports = {verifyEmail};