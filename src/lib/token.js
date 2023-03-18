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
    let p = new Promise((resolve, reject) => {
      try {
        var decoded = jwt.verify(token, process.env.SECRET_KEY);
        resolve(decoded);
      } catch (err) {
        reject("token expired");
      }
    });
    return p;
  }


  async userBasedOnToken(token){
    return new Promise(async (resolve,reject)=>{
      await this.verifyToken(token).then(async(decoded)=>{
        resolve(await accounts.findOne({email:decoded.email}));
  }).catch((err)=>{
    reject(err)
  })
  })}
    
  
}

module.exports = { Token };
