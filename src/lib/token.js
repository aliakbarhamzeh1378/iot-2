let jwt = require("jsonwebtoken");
let { accounts } = require("../model/account");
class Token {
  generateToken(jsonData) {
    return new Promise((resolve, reject) => {
      let token = jwt.sign(jsonData, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRE_TIME
      })
      if (token) {
        console.log(token)
        resolve(token)
      } else {
        console.log('failes')
        reject("failed")
        
      }

    });
  };


  verifyToken(token) {
    return new Promise((resolve, reject) => {
      var decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) {

          console.log(err)
          reject(err);
        } else {
          console.log(decodedToken)
          resolve(decodedToken);
        }
      });
    })
  }


  async userBasedOnToken(token) {
    return new Promise(async (resolve, reject) => {
      await this.verifyToken(token).then(async (decoded) => {
        resolve(await accounts.findOne({ email: decoded.email }));
      }).catch((err) => {
        reject(err)
      })
    })
  }


}

module.exports = { Token };
