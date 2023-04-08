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
        const x=async()=>{
            await this.client.connect()
        }
        x()

    };

    async setData(key,value){
        try{
            await this.client.set(key,value);
        }
        catch(e){
            throw e 
        }
        

    };

    async getData(key){
        try{
            const value = await this.client.get(key);  
            return value
        }
        catch(e){
            throw e 
        }
    }
}
module.exports={RedisService}