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

    getData(key){
        return new Promise(async(resolve,reject)=>{
            const x=await this.client.get(key)
            if(x.length>0){
                resolve(x)
            }
            else{
                reject("not found")
            }
    });
}
    
        // try{
        //     const value =  this.client.get(key,function(err,result) {
        //         if(err){
        //             console.log(err)
        //             throw err
        //         }
        //         else{
        //             console.log(result); 
        //             return result
        //         }
               
        //     });
        //     return value
        // }
        // catch(e){
        //     throw e 
        // }
        
    // }
}
module.exports={RedisService}