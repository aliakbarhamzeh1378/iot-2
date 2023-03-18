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
        if(await master.findOne({master_id:masterId})==null){
            await token.userBasedOnToken(user_token).then(async(usr)=>{
                // return usr
            await MasterService.createMaster(masterId,usr.id,req.body.name).then((message)=>{
                return res.status(201).send({
                    status:"ok",
                    message:"your new master added",
                    data:{}
                })
            }).catch((e)=>{
                return res.status(409).send({
                    status:"error",
                    message:"having problem to saving new master,try again later",
                    data:{}
                })
            });
        }).catch((e)=>{
            return res.status(401).send({
                status:401,
                message:"token has been expired.login to your page again ",
                data:{}
            })  
        })
    }
        else{
            return res.status(409).send({
                status:"error",
                message:"there is a master with this name",
                data:{}
            })
        }
  
    }
,

    deleteMaster:async(req,res)=>{
        let masterId=req.params.id;
        let user_token=req.headers["authorization"];
        await token.userBasedOnToken(user_token).then(async(usr)=>{
            await MasterService.deleteMaster(masterId,usr.id).then((message)=>{
            return res.status(200).send({
                status:"ok",
                message:"master is deleted",
                data:{}
            })
        }).catch((message)=>{
            return res.status(404).send({
                status:"error",
                message:"master with this user not found",
                data:{}
            })
        })
    }).catch((e)=>{
        return res.status(401).send({
            status:401,
            message:"token has been expired.login to your page again ",
            data:{}
        })  
    });
   
    },


    updateMaster:async (req,res)=>{
        let masterId=req.params.id;
        let name=req.body.name;
        let user_token=req.headers["authorization"];
        let user=await token.userBasedOnToken(user_token).then((usr)=>{
        MasterService.updateMaster(masterId,usr.id,name).then((message)=>{
            return res.status(200).send({
                status:"ok",
                message:"your master is updated",
                data:{}
            })
        }).catch((e)=>{
            return res.status(404).send({
                status:"error",
                message:"master with this user not found",
                data:{}
            })
        })
    }).catch((e)=>{
        return res.status(401).send({
            status:401,
            message:"token has been expired.login to your page again ",
            data:{}
        })  
    });
    },

    readMaster:async (req,res)=>{
        let masterId=req.params.id
        let user_token=req.headers["authorization"];
        let user=await token.userBasedOnToken(user_token).then((usr)=>{
            MasterService.readMaster(masterId,usr.id).then((master)=>{
                return res.status(200).send({
                    status:"ok",
                    message:"find master",
                    data:{master}
                })
            }).catch((e)=>{
                return res.status(404).send({
                    status:"error",
                    message:"master not found",
                    data:{}
                })
            })
     }).catch((e)=>{
        return res.status(401).send({
            status:401,
            message:"token has been expired.login to your page again ",
            data:{}
        })  
    });

    }
}