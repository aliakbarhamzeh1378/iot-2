const redis = require("redis");
const { slaves } = require("../model/slave");


class RedisService {
    constructor() {
        this.keys = ["temp", "soil", "ambient", "light", "fan", "pomp", "heater"]
        this.client = redis.createClient({
            host: '127.0.0.1',
            port: '6379'
        });
        this.client.on("err", (err) => {
            console.log(err)
        })
        const x = async () => {
            await this.client.connect()
        }
        x()

    };

    async setData(data, slaveId) {
            for (let x = 1; x <= this.keys.length; x++) {
              
                try {
                    // console.log(`${slaveId}_${this.keys[x - 1]}`, data[x])
                    await this.client.set(`${slaveId}_${this.keys[x - 1]}`, data[x]);
                }
                catch (e) {
                    throw e
                }
            };
    };

    async getData(key) {
        // return new Promise(async (resolve, reject) => {
            const x =await this.client.get(key);
            if (x != null ) {
                return(x)
            }
            else {
                console.log("not found")
            }


        // });
    }
}


module.exports = { RedisService }