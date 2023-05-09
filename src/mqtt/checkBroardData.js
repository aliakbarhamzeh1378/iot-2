let { logicParse } = require("../logic/parseLogic");
let fs = require("fs");
async function updateBoardData() {
    let data = await logicParse();
    slaveId = data[0].toLowerCase();
    let commnd = data[1].split(" ");
    try {
        let fileData = JSON.parse(fs.readFileSync(`./${slaveId}.js`, "utf-8"));
        console.log(fileData)
        if (commnd[0].includes("light")) {
            if (commnd[1].toLowerCase() == "on") {
                fileData[5] ="N"
            }
            else if (commnd[1].toLowerCase() == "off") {
                fileData[5] = "F"
            }
        }
        else if (commnd[0].includes("fan")) {
            if (commnd[1].toLowerCase() == "on") {
                fileData[6] ="N"

            }
            else if (commnd[1].toLowerCase() == "off") {
                fileData[6] ="F"
            }
        }

        else if (commnd[0].includes("pomp")) {

            if (commnd[1].toLowerCase() == "on") {
                fileData[7] ="N"
            }
            else if (commnd[1].toLowerCase() == "off") {
                fileData[7] ="F"
            }
        }

        else if (commnd[0].includes("heater")) {

            if (commnd[1].toLowerCase() == "on") {
                fileData[8] = "N"
            }
            else if (commnd[1].toLowerCase() == "off") {
                fileData[8] ="F"
            }
        }

        return fileData;

    }
    catch (e) {
        console.log(e)
    }


}
module.exports={updateBoardData}
