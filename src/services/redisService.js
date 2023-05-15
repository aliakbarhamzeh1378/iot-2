const redis = require('redis');

class RedisService {
    constructor(){
        this.keys = ["tempSensor","soil_moisture","ambient_humidity","light", "fanButton" ,"water_pomp" , "heater" ];
        this.client = redis.createClient();
        let connection = async()=>{
            await this.client.connect()
        }
        connection()
    }

    async setData(slaveId , data){
        try{
            for(let x=0 ; x<=this.keys.length-1 ; x++){
                let keySet = `${slaveId}_${this.keys[x]}`
                await client.set(keySet , data[x+1])
            };
        }catch{
            console.log("Can't set data")
        }

    }
    async getData(data){
        return new Promise(async(resolve , reject)=>{
            let find_Data = await this.client.get(data);
            if(find_Data){
                resolve(find_Data)
            }else{
                reject("not found")
            }
        })
    }
};
module.exports = {RedisService};