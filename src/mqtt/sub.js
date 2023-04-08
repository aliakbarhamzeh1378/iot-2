const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.emqx.io:1883");
const topicName = "m003/publish";
const { slaves } = require("../model/slave");
const { PlantSensorData } = require("../model/sensorData");
const {RedisService}=require("../services/redisService")
const mongoose = require("mongoose");
const {masterSavedSlaves} = require("../model/masterSlaves");
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
        // console.log(data)
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
                let slaveId=('s' + each_data[0]).toString()
                let findSlaveId = await slaves.findOne({slaveId:slaveId });
                // console.log(each_data)
                if (findSlaveId != null) {
                    let keys=[t,s,h,l]
                    // console.log(keys,each_data)

                    const y=(keys,value )=>{
                        for(let x=1;x<=keys.length;x++){
                            console.log(`${slaveId}_${keys[x-1]}`)
                            RedisService.setData(`${slaveId}_${keys[x-1]}`,value[x])
                        }
                    }
                    y(keys,each_data)
                    
                    // let p = new Promise((resolve, reject) => {
                    //     PlantSensorData.findOneAndUpdate(
                    //         { slave: findSlaveId._id },
                    //         {
                    //             $push: {
                    //                 value: {
                    //                     time: new Date(),
                    //                     TempSensor: each_data[1].trim(),
                    //                     Soil_moisture: each_data[2].trim(),
                    //                     Ambient_humidity: each_data[3].trim(),
                    //                     Light: each_data[4].trim(),
                    //                     fanButton: each_data[5].trim(),
                    //                     Water_pomp: each_data[6].trim(),
                    //                     Heater: each_data[7].trim(),
                    //                     Fan: each_data[8].trim()
    
                    //                 }
                    //             }
                    //         }
                    //         , { upsert: true }
                    //     ),
                    //     function(result , err){
                    //         if(result){
                    //             resolve(true)
                    //         }else{
                    //             console.log(err)
                    //             reject(false)
                    //         }
                    //     }
                    // });
                    // p.then((message)=>{
                    //     console.log("save")                    
                    // }).catch((message)=>{
                    //     console.log("can'tSave")
                    // })
                }
                else{
                    console.log("can't find slave")
                }
                // return p;
            } 
      };
        console.log("finish")
   }
});