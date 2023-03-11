const {accounts}=require("../model/account")
class Validation{
    static async existToDB(email) {
        let user=await accounts.findOne({ email:email })
        if(user){
            return true
        }
        else{
            return false
            
        }
         }
      }


module.exports={Validation}