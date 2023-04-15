const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.emqx.io:1883");
const topicName = "m003/publish";
const { slaves } = require("../model/slave");
const { PlantSensorData } = require("../model/sensorData");
const mongoose = require("mongoose");
const {masterSavedSlaves} = require("../model/masterSlaves");
const {SlaveService} = require("../services/slaveService");

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
                try{
                    let newSave = await masterSavedSlaves.create({
                        time : Date.now(),
                        value : data[i]
                    });
                }catch{
                    console.log("Can't save slaves")
                };

            }else{
                let each_data = data[i].replace("s:", "").split(",");
                let findSlaveId = await slaves.findOne({ slaveId: ('s' + each_data[0]).toString()});
                if (findSlaveId != null) {
                    await SlaveService.addSensorData(each_data , findSlaveId._id)
                    .then((message)=>{
                        console.log(message)                    
                    }).catch((e)=>{
                        console.log(e)
                    })
                };
            } 
      };
        console.log("finish")
   }
});