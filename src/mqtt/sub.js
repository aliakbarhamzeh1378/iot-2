const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.emqx.io:1883");
const topicName = "m003/publish";
const { slaves } = require("../model/slave");
// const { PlantSensorData } = require("../model/sensorData");
const mongoose = require("mongoose");
const {masterSavedSlaves} = require("../model/masterSlaves");
const {SlaveService} = require("../services/slaveService");
const {RedisService}=require("../services/redisService");
const {Automation}=require("../services/automationService")
const redisObj=new RedisService()

try{
    mongoose.connect("mongodb://127.0.0.1:27017/greenhouse");
}catch{
    console.log("can't connect to mongoDB");
};


function sub(){
    return new Promise((resolve,reject)=>{
        // client.on("connect", () => {
        //     console.log("connected");
        //     client.subscribe([topicName], (err, granted) => {
        //         if (err) {
        //             console.log("Can't connect");
        //         }
        //         console.log(`Subscribe to topic ${topicName}`);
        //     })
        // });

        client.subscribe(topicName,function(err){
            if(!err){
                console.log(`Subscribe to topic ${topicName}`);
            }
        })

        client.on("message", async (topic, message, packet) => {
            if (topic === topicName) {
                console.log(typeof packet.payload)
                let data = packet.payload.toString().replace("{", "").replace("}", "").trim().split("\n");
                for (let i = 0 ; i < data.length; i++){
                    if(data[i][0]==='"'){
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
                            console.log(each_data)
                            let eachData = each_data.replace("s:", "s").split(","); 
                            let slaveId=eachData[0].toString();
                            slaves.findOne({slaveId: slaveId},async function(err,findSlave){
                                if(err){
                                    console.log("can't find");
                                    reject("err")
                                }
                                else{
                                    const edit_slaveId=eachData[0];
                                    Automation.saveToFile(`/home/rozhan/greenhouse/iot-2/src/mqtt/jsFiles/${edit_slaveId}.js`,eachData);
                                    // Automation.saveToFile(`__dirname/${edit_slaveId}.js`,eachData);

                                    redisObj.setData(eachData,slaveId);
                                    resolve("ok")
                                }
                            }); 
                          
                        }
                        };
                    
              };
                console.log("finish");
           }
        });

        // client.end()

    })
}


// sub().then((message)=>{
//     console.log(message)
// }).catch((e)=>{
//     console.log(e)
// })
module.exports={sub}









