const fs=require("fs");
let jsonTxt = require("../logic/logicText.json");
let { RedisService } = require("../services/redisService");
let redisObj = new RedisService();

class Automation{
    static saveToFile(fileAddress,arrayData){
        try{
            let writer=fs.createWriteStream(fileAddress,{
                flags:"w"
            }).on("error",function(error){
                console.log(error)
            })
            
            writer.write(JSON.stringify(arrayData))
        }
        catch{
            console.log("continue")
        }

        }

        static async parseLogic(jsonTxt) {
            let insideIf = "";
            let result = "";
            let slaveId;
            let redisCondition = [];
            for (let field of jsonTxt) {
                slaveId = Object.keys(field).join("").toLowerCase();
                for (let eachValue of Object.values(field).pop()) {
                    let editedvalues = Object.values(eachValue);
                    editedvalues.forEach((item) => {
                        if (item == "and") {
                            let index = editedvalues.indexOf("and");
                            editedvalues[index] = "&&"
                        }
                        else if (item == "or") {
                            let index = editedvalues.indexOf("or");
                            editedvalues[index] = "||"
                        }
                        else if (item == "then") {
                            let index = editedvalues.indexOf("then");
                            result = editedvalues[index + 1]
                            editedvalues.splice(index, index + 1)
                        }
                    });
                    // console.log(`${slaveId}_${editedvalues[0]}`)
                    let redisResult = await redisObj.getData(`${slaveId}_${editedvalues[0]}`);
                    let equalation = `const ${editedvalues[0]}=${redisResult}`
                    if (redisCondition.includes(equalation) == false) {
                        redisCondition.push(equalation)
                    }
                    insideIf += editedvalues.join(" ")
                    }

                    }
                    let jsCondition = redisCondition.join("\n") + `\nif(${insideIf}){
                    "${result}"
                    }`;
                    return [slaveId, eval(jsCondition)];
        }


        static async  updateBoardData(jsonTxt) {
            let data = await this.parseLogic(jsonTxt);
            let slaveId = data[0];
            let fileData = JSON.parse(fs.readFileSync(`/home/rozhan/greenhouse/iot-2/src/mqtt/jsFiles/${slaveId}.js`));

            try {
                let commnd = data[1].split(" ");
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
                const boardData=fileData.join(",").replace("s","");
                return boardData
        
            }
            catch (e) {
                const boardData=fileData.join(",").replace("s","");
                return boardData
                // console.log(e)
            }
        
        
        };
    }



let x=async()=>{
    await Automation.updateBoardData(jsonTxt);
    // console.log(await Automation.parseLogic(jsonTxt))

}
x()
module.exports={Automation}