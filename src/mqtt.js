const mqtt=require("mqtt");
const client=mqtt.connect("mqtt://test.mosquitto.org:1883");
const topic=process.env.TOPIC_NAME;
client.on("connect",()=>{
    console.log("server connected");
    client.subscribe(topic)
})