const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/greenhouse");
const { accounts } = require("../model/account");
const bcrypt = require("bcrypt");
const { Token } = require("../lib/token");
const token = new Token();
const { hashs } = require("../model/hash");

class AuthService {

  static async find_Update(email, jsonUpdate) {
    await accounts.findOneAndUpdate({ email: email }, jsonUpdate);
  }

  static async loginCheck(email, password) {        //login check
    return new Promise(async (resolve, reject) => {
      let user = await accounts.findOne({ email: email });
      if (user) {
        const passCheck = await bcrypt.compare(password, user.password);
        if (passCheck) {
          if (user.status == "active") {
            resolve(200); //account is active
          } else {
            resolve(403); //account is deactivated
          }
        } else {
          resolve("password is wrong");
        }
      } else {
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

  static deleteHash(email) {
    hashs.findOne({ email: email }, async (user, err) => {
      if (user) {
        await hashs.deleteOne({ email: email });
      }
    });
  }

  static hashPassword(password) {
    try {
      let newPass = password.toString();
      let salt = parseInt(bcrypt.genSalt(10));
      let hash = bcrypt.hash(newPass, salt);
      return hash;
    } catch (e) {
      console.log(e);
      // throw error;
    }
  }

  static checkExpiration(expTime) {
    return Date.now() - expTime < 86400000;
  }
}

module.exports = { AuthService };
