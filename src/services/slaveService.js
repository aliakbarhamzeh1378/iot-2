const {slaves} = require("../model/slave");
const {plants} = require("../model/plant");
const {Token} = require("../lib/token")
const {PlantSensorData} = require("../model/sensorData")

class SlaveService {
    static async addNewSlave(req,plantId,userId){
        let body = req.body;
            return new Promise(async(resolve , reject)=>{
                let newSlave = await new slaves({
                    slaveId : body.slaveId ,
                    slaveName : body.slaveName ,
                    masterId : body.masterId ,
                    plantId : plantId ,
                    userId :userId
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
                plantId : body.plantId=="" ? slaves.plantId : body.plantId, 

            },function(error , docs){
                if(docs){
                    resolve("Update information");
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
    };

    
    static addSensorData(each_data , slaveId){
        let data = new Promise((resolve, reject) => {
          PlantSensorData.findOneAndUpdate(
              { slaves: slaveId },
              {
                  $push: {
                      value: {
                          time: new Date(),
                          TempSensor: each_data[1],
                          Soil_moisture: each_data[2],
                          Ambient_humidity: each_data[3],
                          Light: each_data[4],
                          fanButton: each_data[5],
                          Water_pomp: each_data[6],
                          Heater: each_data[7],
                          Fan: each_data[8]
  
                      }
                  }
              }
              ,{upsert:true},
              function (error, result) {
                if (error) {
                  console.log(error);
                  reject(error)
                } else {
                  resolve(result) 
                }
            }
          )
      });
      return data
    };
};

module.exports = {SlaveService};