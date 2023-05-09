const fs=require("fs");
class Automation{
    static saveToFile(arrayData){
        try{
            const slaveId=arrayData[0];
            let writer=fs.createWriteStream(`./${slaveId}.js`,{
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
    }

module.exports={Automation}