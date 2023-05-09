const fs=require("fs");
class Automation{
    static saveToFile(arrayData){
        const slaveId=arrayData[0].toLowerCase().trim();
            let writer=fs.createWriteStream(`./${slaveId}.js`,{
                flags:"w"
            }).on("error",function(error){
                console.log(error)
            })
            writer.write(arrayData.toString())
        }
    }


module.exports={Automation}