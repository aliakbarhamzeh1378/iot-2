const {MasterService}=require("../../services/masterService");
const {master}=require("../../model/master")
const mongoose=require("mongoose");
const {Token}=require("../../lib/token");
const {accounts}=require("../../model/account")
let token=new Token();
module.exports={
    addMaster:async(req,res)=>{
        let masterId=req.body.id;
        let user_token=req.headers["authorization"];
        await token.verifyToken(user_token).then(async(decoded)=>{
            let user=await accounts.findOne({email:decoded.email})
            if(await master.findOne({master_id:masterId})==null){
                await MasterService.createMaster(masterId,user.id,req.body.name)
                return res.status(200).send({
                    status:200,
                    message:"your new master added",
                    data:{}
                })
            }
            else{
                return res.status(409).send({
                    status:409,
                    message:"there is a master with this name",
                    data:{}
                })
            }
        }).catch((err)=>{
            return res.status(401).send({
                status:401,
                message:"token has been expired.login to your page again ",
                data:{}
            })        }
        )
  
    },

    deleteMaster:async(req,res)=>{
        let masterId=req.params.id;
            await MasterService.deleteMaster(masterId).then((message)=>{
            return res.status(200).send({
                status:200,
                message:"master is deleted",
                data:{}
            })
        }).catch((message)=>{
            return res.status(404).send({
                status:404,
                message:"master not found",
                data:{}
            })
        })
   
    },


    updateMaster:(req,res)=>{
        let masterId=req.params.id;
        let name=req.body.name;
        MasterService.updateMaster(masterId,name).then((message)=>{
            return res.status(200).send({
                status:200,
                message:"your master is updated",
                data:{}
            })
        }).catch((e)=>{
            return res.status(404).send({
                status:200,
                message:"your master is not found",
                data:{}
            })
        })
    },

    readMaster:(req,res)=>{
        let masterId=req.params.id
        MasterService.readMaster(masterId).then((master)=>{
            return res.status(200).send({
                status:200,
                message:"find master",
                data:{master}
            })
        }).catch((e)=>{
            return res.status(404).send({
                status:404,
                message:"master not found",
                data:{}
            })
        })
    }

    }
