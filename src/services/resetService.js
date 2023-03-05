let {Validation} = require("../lib/validation");
let {Token} = require("../lib/token");
let {accounts}=require("../model/account");
const mongoose = require("mongoose");
const { hashs } = require("../model/hash");

module.exports = {
    findAccount : async function(password,token){
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
    },

    exipreToken : async function(hash){
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
    }
}