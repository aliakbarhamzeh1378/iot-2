let cron = require("node-cron");
let fs = require("fs");
let path = require("path");
let jsonFilesPath = "../mqtt/jsonFiles";
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://broker.emqx.io:1883");
const topicName = "m003/publish";
let { pub } = require("../mqtt/pub");
let { sub } = require("../mqtt/sub");


    console.log("hi")
    cron.schedule("* * * * *", () => {

    client.on("connect", () => {
        sub().then((message) => {
            console.log(message)
            fs.readdir(jsonFilesPath, (err, files) => {
                if (err) {
                    console.log(err)
                }
                else {
                    files.forEach(file => {
                        fs.readFile(path.join(jsonFilesPath, file), async (err, fileData) => {
                            if (fileData) {
                                const jsonData = JSON.parse(fileData.toString());
                                console.log(jsonData);
                                pub(jsonData);
                            }
                            else {
                                console.log(err);
                            }
                        })
                    })
                }

            })
            client.end()
        }).catch((e) => {
            console.log(e)
        })
    });


    client.on("error", function (err) {
        console.log("Error:" + err);
        if (err.code == "ENOTFOUND") {
            console.log("Network error , make sure you have an active internet connection")
        }
    });
})