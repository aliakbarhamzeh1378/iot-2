const fs=require("fs");
const {RedisService}=require("../services/redisService");
const redisCls=new RedisService()
// const data=req.body.data;

redisCls.getData("s003_t").then((message)=>{
    const data="if (temp>30){'fan on'}"
    fs.writeFileSync("./jsInput.js",`const temp=${message}; \n${data}`,{
        flag: "w",
    },function(err,result){
        if(err){
            console.log(err)
        }else{
            console.log(result)
        }
    })}).catch((e)=>{
    console.log(e)
})

