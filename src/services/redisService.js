const { Exception } = require("handlebars");
const {createClient}=require("redis");
const redis=require("redis");

class RedisService{
    constructor(){
        this.client = redis.createClient({
            host: '127.0.0.1',
            port: '6379'
        });
        this.client.on("err",(err)=>{
        console.log(err)
        })
    };

    static async  setData(key,value){
        try{
            await this.client.connect()
            await this.client.set(key,value);
            console.log("your data is set")
        }
        catch(e){
            throw e 
        }
        

    };

    static async getData(key){
        try{
            await this.client.connect()
            const value = await this.client.get(key);  
            return value
        }
        catch(e){
            throw e 
        }
    }
}
module.exports={RedisService}