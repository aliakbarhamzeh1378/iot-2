const {slaves} = require("../model/slave");
const {plants} = require("../model/plant");
const {Token} = require("../lib/token")

class SlaveService {
    static async addNewSlave(req){
        let body = req.body;
        let plantId = await plants.findOne({name : body.plantName});
        if (plantId!=null){
            return new Promise(async(resolve , reject)=>{
                let newSlave = await new slaves({
                    slaveId : body.slaveId ,
                    slaveName : body.slaveName ,
                    masterId : body.masterId ,
                    plant : plantId._id
                });
                if(newSlave.save()){
                    resolve(true)
                }else{
                    reject(false)
                }
            })
        }else{
            console.log("can't find plant")
        }
    };

    static updateSlave(req){
        let body = req.body;
        let filter = {slaveId : body.slaveId};
        return new Promise((resolve , reject)=>{
            let findAndUpdate = slaves.findOneAndUpdate(filter , {
                slaveId : slaves.slaveId , 
                slaveName : body.slaveName=="" ? slaves.slaveName : body.slaveName,
                masterId : body.masterId=="" ? slaves.masterId : body.masterId, 
  
            },function(error , docs){
                if(docs){
                    resolve("Update iformation");
                }else{
                    reject("Can't update information.No such slave")
                }
            }
            )

        })
    }
    

    static deleteSlave(req){
        return new Promise((resolve , reject)=>{
            let findAndDelete = slaves.findOneAndDelete({
                slaveId : req.body.slaveId
            }, function(err , docs){
                if(docs){
                    resolve("Delete User")
                }else{
                    reject("can't find the slave")
                }
            }
            )
        });
    }

    static getData(req){
        return new Promise((resolve , reject)=>{
            let findSlave = slaves.findOne({
                slaveId : req.body.slaveId
            }, function(error , docs){
                if(docs){
                    resolve(findSlave)
                }else{
                    reject("can't find slave")
                }
            }
            )
        })
    }
};

module.exports = {SlaveService};