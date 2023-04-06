require("dotenv").config();
const mqtt = require("mqtt");
const host = "broker.emqx.io";
const port = '1883';
const connectUrl = `mqtt://${host}:${port}`;


const clientId = `m${Math.random().toString(8).slice(-2)}`
const client = mqtt.connect(connectUrl , {
    clientId,
    clean:false,
    reconnectPeriod : 1000
})

client.on("connect" , ()=>{
    console.log("connected")
})
