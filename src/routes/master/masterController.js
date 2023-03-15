const {MasterService}=require("../../services/masterService");
const {master}=require("../../model/master")
module.exports={
    addMaster:async(req,res)=>{
        let masterName=req.body.name;
        if(master.findOne({name:masterName})==null){
            await MasterService.createMaster({
                name:masterName
            })
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
    }
}