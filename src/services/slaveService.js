const {slaves} = require("../model/slave");
const {Token} = require("../lib/token")

class SlaveService {
    static addNewSlave(req){
        return new Promise(async(resolve , reject)=>{
            let body = req.body;
            let newSlave = await new slaves({
                slaveId : body.slaveId ,
                slaveName : body.slaveName ,
                masterId : body.masterId ,
                tempSesor : body.tempSesor ,
                lightSesor : body.lightSesor ,
                ambientHumidSesor : body.ambientHumidSesor ,
                soilHumidSesor : body.soilHumidSesor ,
                fanButton : body.fanButton,
                lightButton : body.lightButton ,
                heatButton : body.heatButton ,
                waterPompButton : body.waterPompButton
            });
            if(newSlave.save()){
                resolve(true)
            }else{
                reject(false)
            }
        })

    };

    static updateSlave(req){
        let body = req.body;
        let filter = {slaveId : body.slaveId};
        return new Promise((resolve , reject)=>{
            let findAndUpdate = slaves.findOneAndUpdate(filter , {
                slaveId : slaves.slaveId , 
                slaveName : body.slaveName=="" ? slaves.slaveName : body.slaveName,
                masterId : body.masterId=="" ? slaves.masterId : body.masterId, 
                tempSesor : body.tempSesor=="" ? slaves.tempSesor : body.tempSesor ,
                lightSesor : body.lightSesor=="" ? slaves.lightSesor : body.lightSesor,
                ambientHumidSesor : body.ambientHumidSesor=="" ? slaves.ambientHumidSesor : body.ambientHumidSesor,
                soilHumidSesor : body.soilHumidSesor=="" ? slaves.soilHumidSesor : body.soilHumidSesor,
                fanButton : body.fanButton=="" ? slaves.fanButton : body.fanButton,
                lightButton : body.lightButton=="" ? slaves.lightButton : body.lightButton,
                heatButton : body.heatButton=="" ? slaves.heatButton : body.heatButton,
                waterPompButton : body.waterPompButton=="" ? slaves.waterPompButton : body.waterPompButton,
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