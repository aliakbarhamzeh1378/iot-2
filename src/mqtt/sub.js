const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.emqx.io:1883");
const topicName = "m001/publish";
const { slaves } = require("../model/slave");
// const { PlantSensorData } = require("../model/sensorData");
const mongoose = require("mongoose");
const {masterSavedSlaves} = require("../model/masterSlaves");
const {SlaveService} = require("../services/slaveService");
const {RedisService}=require("../services/redisService");
const redisObj=new RedisService()

try{
    mongoose.connect("mongodb://127.0.0.1:27017/greenhouse");
}catch{
    console.log("can't connect to mongoDB");
};


client.on("connect", () => {
    console.log("connected");
    client.subscribe([topicName], (err, granted) => {
        if (err) {
            console.log("Can't connect");
        }
        console.log(`Subscribe to topic ${topicName}`);
    })
});

client.on("message", async (topic, message, packet) => {
    if (topic === topicName) {
        let data = packet.payload.toString().replace("{", "").replace("}", "").trim().split("\n");
        for (let i = 0 ; i < data.length; i++){
            if(data[i][0]==='"'){
                console.log(data[i])
                try{
                    await masterSavedSlaves.create({
                        time : Date.now(),
                        value : data[i]
                    });
                }catch{
                    console.log("Can't save slaves")
                };

            }else{
                for(let each_data of data){ 
                    let eachData = each_data.replace("s:", "s").split(","); 
                    let slaveId=eachData[0].toString();
                    console.log(slaveId)
                    slaves.findOne({slaveId: slaveId},async function(err,findSlave){
                        if(err){
                            console.log("can't find")
                        }
                        else{
                            console.log(findSlave);
                            redisObj.setData(eachData,slaveId);
                            
                            SlaveService.addSensorData(eachData , findSlave._id)
                            // .then((message)=>{
                            //     console.log(message)                    
                            // }).catch((e)=>{
                            //     console.log(e)
                            // })
                        }
                    }); 
                    console.log(eachData)             
                  
                }
                };
            
      };
        console.log("finish")
   }
});










