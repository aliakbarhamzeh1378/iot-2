const {createClient}=require("redis");
const redis=require("redis")

const client = redis.createClient({
        host: '127.0.0.1',
        port: '6379'
});
client.on("err",(err)=>{
    console.log(err)
})


async function connection(){

    await client.connect()
    console.log("hii")

    await client.set("name","rozhan")

    const value = await client.get("name");

    console.log(value);

    // client.set("name","rozhan",(err,reply)=>{
    
    //     if (err){
    //         throw err
    //     }
    //     console.log(reply)
    // })

    // client.get("name",(err,reply)=>{
    //     console.log(reply)
    // })
}
connection()