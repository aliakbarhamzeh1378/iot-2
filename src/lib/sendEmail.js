const fs=require("fs");
const handlebar=require("handlebars");
const nodemailer = require("nodemailer");
function send_email(path,replacement,email,subject) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // host:"",
    // port:465,
    // secure:true,
    auth: {
      user: "rojanrahmani2002@gmail.com",
      pass: "fwgizfclwmdgzlsa",
    },
  });

    fs.readFile( "src\\views\\"+path, { encoding: "utf-8" }, (err, html) => {
      if (err) {
        throw err;
      } else {
        let template = handlebar.compile(html);
        htmlToSend = template(replacement);
        let message = {
          from: "rojanrahmani2002@gmail.com",
          to: email,
          subject: subject,
          html: htmlToSend,
        };
        transporter.sendMail(message, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log("email successfully sent");
          }
        });
      }
    });

  }

module.exports = { send_email };
