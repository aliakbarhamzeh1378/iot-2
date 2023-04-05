let jwt = require("jsonwebtoken");
let { accounts } = require("../model/account");
const { OAuth2Client } =require("google-auth-library");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

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
    let p = new Promise((resolve, reject) => {
      try {
        var decoded = jwt.verify(token, process.env.SECRET_KEY);
        resolve(decoded);
      } catch (err) {
        reject("token expired");
      }
    });
    return p;
  };


  async verifyGoogleToken(token){
    try{
        const ticket = await client.verifyIdToken({
            idToken : token ,
            audience : GOOGLE_CLIENT_ID
        });
        return {payload : ticket.getPayload()}
    }catch(error){
        return {error : "Invalid user detected.PLease try again"};
    }
  }
}

module.exports = { Token };
