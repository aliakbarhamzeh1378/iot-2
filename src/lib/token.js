let jwt = require("jsonwebtoken");
let { accounts } = require("../model/account");

class Token {
  generateToken(jsonData) {
    //example of entry parameter { email: email }
    let token = jwt.sign(jsonData, process.env.SECRET_KEY, {
      expiresIn: 100000,
    });
    return token;
  }

  verifyToken(token) {
    let p = new Promise((resolve, reject) => {
      try {
        var decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (decoded) {
          resolve(decoded);
        } else {
          reject("failed");
        }
      } catch (e) {
        // console.log(e);
        reject("failed");
      }
    });
    return p;
  }
}

module.exports = { Token };
