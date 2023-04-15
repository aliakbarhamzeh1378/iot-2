const fs=require("fs");
const {RedisService}=require("../services/redisService");
const redisCls=new RedisService()
// const data=req.body.data;

const topic="s003"
const data="if temp >= 30 and if light > 12 then fanOn "

function x(data){
    const sentence=[];
    const noEmptyData=data.split("if").filter((str)=>str!="");
    for(let i=0;i<noEmptyData.length;i++){
        console.log(noEmptyData[i])
        const itemsList=noEmptyData[i].trim().split(" ");
        const attr=itemsList[0];
        const key=`${topic}_${attr}`;
        redisCls.getData(key).then((message)=>{
            sentence.push(`const ${attr}=${message}; \n`)

        }).catch((e)=>{
            console.log(e)
        })
    };
    return sentence
}

console.log(x(data));

fs.writeFileSync("./jsInput.js",data,{
    flag: "w",
},function(err,result){
    if(err){
        console.log(err)
    }else{
        console.log(result)
    }
})
