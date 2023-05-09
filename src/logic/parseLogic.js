let fs = require("fs");
let { RedisService } = require("../services/redisService");
let redisObj = new RedisService();
let jsonTxt = require("./logicText.json");

module.exports = {
    async logicParse() {
        let insideIf = "";
        let result = "";
        let slaveId;
        let redisCondition = [];
        for (let field of jsonTxt) {
            slaveId = Object.keys(field).join("");
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

                let redisResult = await redisObj.getData(`${slaveId}_${editedvalues[0]}`);
                let equalation = `const ${editedvalues[0]}=${redisResult}`
                if (redisCondition.includes(equalation) == false) {
                    redisCondition.push(equalation)
                }
                // console.log(redisCondition)
                insideIf += editedvalues.join(" ")
            }

        }
        let jsCondition = redisCondition.join("\n") + `\nif(${insideIf}){
         "${result}"
    }`;
        return [slaveId, eval(jsCondition)];


    }
}

