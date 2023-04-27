const { connect } = require('mongoose');
const redis = require('redis');
const client = redis.createClient();
client.on("error" , err => console.log("Redis CLient Error" , err));

class RedisService {
    constructor(){
        this.connect
    }
    async connect(){
        await client.connect();
    }
    async setData(slaveId , ){
        this.connect();
        let key = 
        await client.set()
    }
}