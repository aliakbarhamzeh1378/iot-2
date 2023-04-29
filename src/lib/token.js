let jwt = require("jsonwebtoken");
let { accounts } = require("../model/account");
class Token {
  generateToken(jsonData) {
    return new Promise((resolve, reject) => {
      let token = jwt.sign(jsonData, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRE_TIME
      })
      if (token) {
        resolve(token)
      } else {
        reject("failed")
        
      }

    });
  };


  verifyToken(token) {
    return new Promise((resolve, reject) => {
      var decoded = jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
        if (err) {
          reject(err);
        } else {
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


  async  verifyGoogleToken(token) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      return { payload: ticket.getPayload() };
    } catch (error) {
      return { error: "Invalid user detected. Please try again" };
    }
  }  

}

module.exports = { Token };
