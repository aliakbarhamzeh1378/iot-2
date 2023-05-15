const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.emqx.io:1883");
const topicName = "m003/subscribe" ;
const {LogicService} = require("../services/logicService");

client.on("connect" , ()=>{
    console.log("client connected");
    const payload = {s1:"001" , s2:"002" , s3:"003"};
    
    client.publish(topicName , JSON.stringify(payload) ,{qos : 0 , retain : true} , (err ,packet)=>{
        if(err){
            console.log(err , "Mqtt publish packet");
        }
    });
});


client.on("error" , function(err){
    console.log("Error:"+err);
    if(err.code=="ENOTFOUND"){
        console.log("Network error , make sure you have an active internet connection")
    }
});
