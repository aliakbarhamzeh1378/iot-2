const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.emqx.io:1883");
const topicName = "m003/subscribe";
let jsonTxt = require("../logic/logicText.json");

const { Automation } = require("../services/automationService");

async function pub(jsonTxt) {
    client.on("connect", async () => {
        console.log("client connected");
        let boardData = await Automation.updateBoardData(jsonTxt);
        const payload =JSON.stringify({s:boardData}).replace(/"/g, '') // develop by rozhan's love
        client.publish(topicName, payload, { qos: 0, retain: true }, (err, packet) => {
            if (err) {
                console.log(err, "Mqtt publish packet");
            }
            else {
                console.log("data sent");
            }
        });
    });


    client.on("error", function (err) {
        console.log("Error:" + err);
        if (err.code == "ENOTFOUND") {
            console.log("Network error , make sure you have an active internet connection")
        }
    });
  
}


// pub(jsonTxt)
module.exports = { pub }