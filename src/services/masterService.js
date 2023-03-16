const {master}=require("../model/master")
class MasterService{
    static async find_one(masterId){
        return await master.findOne({master_id:masterId})
    }
    static async createMaster(master_id,user_id,name){

        await master.create({
            master_id:master_id,
            user_id:user_id,
            name:name
        })

    };

    static  deleteMaster(masterId){
        return new Promise((resolve,reject)=>{
            master.findOneAndDelete({master_id:masterId},(err,response)=>{
                if(response){
                    resolve(response);
                    }
                else{
                    reject(err);
                }
            })
        })
       
    };

    static  updateMaster(materId,name){
        return new Promise((resolve,reject)=>{
            master.findOneAndUpdate({master_id:materId},{name:name},(err,res)=>{
                if(res){
                    resolve(res)
                }
                else{
                    reject(err)
                }
            })
        })
      
    };

    static  readMaster(id){
        return new Promise((resolve,reject)=>{
            master.findOne({master_id:id},(err,res)=>{
                if(res){
                    resolve(res)
                }
                else{
                    reject(err)
                }
            })
        })
        
    };
}

module.exports={MasterService}