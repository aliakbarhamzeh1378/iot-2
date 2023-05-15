const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.emqx.io:1883");
const topicName = "m003/subscribe";
let jsonTxt = require("../logic/logicText.json");

const { Automation } = require("../services/automationService");

async function pub(jsonTxt) {
        let boardData = await Automation.updateBoardData(jsonTxt);
        const payload =JSON.stringify({s:boardData}).replace(/"/g, '') // develop by rozhan's love
        console.log(payload);
        client.publish(topicName, payload, { qos: 0, retain: true }, (err, packet) => {
            if (err) {
                console.log(err, "Mqtt publish packet");
            }
            else {
                console.log("data sent");
            }
        });



  
}


// pub(jsonTxt)
module.exports = { pub }