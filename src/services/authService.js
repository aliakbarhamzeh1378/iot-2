let jwt = require("jsonwebtoken");
let bcrypt  =require("bcrypt");
const { accounts } = require("../model/account");
let {Validation} = require("../lib/validation");
let {Token} = require("../lib/token");
let {accounts}=require("../model/account");
const mongoose = require("mongoose");
const { hashs } = require("../model/hash");

class authService{
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
    };

    async findAccount(password,token){
        let hash = await Validation.hashPassword(password);
        return new Promise(async(resolve , reject)=>{
            let p = new Token().verifyToken(token);   
            let reset = await accounts.findOneAndUpdate(
                { email: token },
                { password: hash }
            );
            if(reset){
                resolve(true)
            }else{
                reject(false)
            }
        })
    };

    async exipreToken(hash){
        // let hash = req.query.hash;
        return new Promise((resolve , reject)=>{
            let result = hashs.findOne({ hash: hash });
            if(result){
                let expTime = result.hash;
                console.log(expTime)
                resolve(expTime)
            }else{
                reject("false")
            }

        })
    };
};
module.exports ={authService}
