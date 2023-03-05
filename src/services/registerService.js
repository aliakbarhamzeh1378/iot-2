let jwt = require("jsonwebtoken");
let bcrypt  =require("bcrypt");
const { accounts } = require("../../src/model/account");

class RegService{
    static addNewPerson(body,password){
        return new Promise((resolve , reject)=>{
            let newCreate = new accounts({
                fullname: body.fullname,
                email: body.email,
                password: password,
                status: "active",
            });
            if(newCreate.save()){
                resolve(true)
            }else{
                reject(false)
            }
        })

    };
    static hashPassword(password) {
        return new Promise((resolve , reject)=>{
            let newPass = password.toString();
            let salt = parseInt(bcrypt.genSalt(10));
            let hash = bcrypt.hash(newPass, salt);
            if(hash){
                resolve(hash)
            }else{
                reject("failed")
            }
        })
    };
    
    static generateToken(email) {
        return new Promise((resolve , reject)=>{
            let token = jwt.sign({ email: email }, "GrHouse", {
                    expiresIn: 100000})
            if(token){
                resolve(token)
            }else{
                reject("failed")
            }

        });
      }
};
module.exports ={RegService}
