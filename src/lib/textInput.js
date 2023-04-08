const fs=require("fs");
// const data=req.body.data;
const data="if (temp>30){'fan on'}"
fs.writeFileSync("./jsInput.js",data,{
    flag: "w",
},function(err,result){
    if(err){
        console.log(err)
    }else{
        console.log(result)
    }
})