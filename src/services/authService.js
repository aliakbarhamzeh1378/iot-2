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
  static addNewPerson(body, password , roles) {
    return new Promise((resolve, reject) => {
      let newCreate = new accounts({
        fullname: body.fullname,
        email: body.email,
        password: password,
        role : roles ,
        status: "deactive",
      });
      if (newCreate.save()) {
        resolve(newCreate)
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
    try{
      await accounts.findOneAndUpdate({ email: email }, jsonUpdate);
    }catch{
      console.log("can't find such email")
    }
  }

  static async loginCheck(email, password) {       
    return new Promise(async (resolve, reject) => {
      let user = await accounts.findOne({ email: email });
      if (user) {
        const passCheck = await bcrypt.compare(password, user.password);
        if (passCheck){
  
          if (user.status == "active") {
            console.log("active")
            resolve(user); //account is active
          } else {
            console.log("403")
            reject(403); //account is deactivated
          }
        }else{
          console.log("password is wrong")
          reject("password is wrong");
        }
      }else{
        console.log("your email is wrong")
        reject("your email is wrong");
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
  };

  static updateRole(user_email , newRole){
    return new Promise((resolve , reject)=>{
      let findUser = accounts.findOneAndUpdate({email : user_email} , {role : newRole})
      if(findUser){
        resolve(findUser)
      }else{
        reject("can't find user")
      }
    })
  }
}

module.exports = { AuthService };
