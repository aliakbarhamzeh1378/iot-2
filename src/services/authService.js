let jwt = require("jsonwebtoken");
let bcrypt  =require("bcrypt");
const { accounts } = require("../model/account");
let {Validation} = require("../lib/validation");
let {Token} = require("../lib/token");
const mongoose = require("mongoose");
const { hashs } = require("../model/hash");
mongoose.connect("mongodb://127.0.0.1:27017/greenhouse");
const token = new Token();

class AuthService {
  static addNewPerson(body, password) {
    return new Promise((resolve, reject) => {
      let newCreate = new accounts({
        fullname: body.fullname,
        email: body.email,
        password: password,
        status: "active",
      });
      if (newCreate.save()) {
        resolve(true)
      } else {
        reject(false)
      }
    });
  };

  static hashPassword(password) {
    try{
      let newPass = password.toString();
      let salt = parseInt(bcrypt.genSalt(10));
      let hash = bcrypt.hash(newPass, salt);
      return hash
    }
   catch(e){
    throw e
   }
  };


  static async find_Update(email, jsonUpdate) {
    await accounts.findOneAndUpdate({ email: email }, jsonUpdate);
  }

  static async loginCheck(email, password) {       
    return new Promise(async (resolve, reject) => {
      let user = await accounts.findOne({ email: email });
      if (user) {
        const passCheck = await bcrypt.compare(password, user.password);
        if (passCheck){
          if (user.status == "active") {
            resolve(200); //account is active
          } else {
            resolve(403); //account is deactivated
          }
        }else{
          resolve("password is wrong");
        }
      }else{
        resolve("your email is wrong");
      }
    });
  }

  static async addHash(email, randomHash) {
    await hashs.create({      //use for forget password
      email: email,
      hash: randomHash,
      time_created: Date.now(),
    });
  }

  static async deleteHash(email) {
    let findEmail = hashs.findOne({ email: email });
      if (findEmail==true) {
        await hashs.deleteOne({ email: email });
      }
    };




  static checkExpiration(expTime) {
    return Date.now() - expTime < 86400000;
  }
}

module.exports = { AuthService };
