const {master}=require("../model/master")
class MasterService{
    static async createMaster(id,user_id){
        await master.create({
            id:id,
            user_id:user_id
        })

    };

    static  deleteMaster(id){
        master.deleteOne({id:id},(err,res)=>{
            if(res){
                return res
            }
            else{
                return err
            }
        })
    };

    static  updateMaster(oldId,newId){
        master.findOneAndUpdate({id:oldId},{id:newId},(err,res)=>{
            if(res){
                return res
            }
            else{
                return err
            }
        })
    };

    static  findMaster(id){
        master.findOne({id:id},(err,res)=>{
            if(res){
                return res
            }
            else{
                return err
            }
        })
    };
}

module.exports={MasterService}