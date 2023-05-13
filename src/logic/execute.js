let cron=require("node-cron");
let fs=require("fs");
let path=require("path");
let jsonFilesPath="../mqtt/jsonFiles";
let {pub}=require("../mqtt/pub");
let {sub}=require("../mqtt/sub");


cron.schedule("* * * * *",()=>{
    sub()
    fs.readdir(jsonFilesPath,(err,files)=>{
        if(err){
            console.log(err)
        }
        else{
            files.forEach(file=>{
                fs.readFile(path.join(jsonFilesPath,file),(err,fileData)=>{
                    if(fileData){
                        const jsonData = JSON.parse(fileData.toString());
                        console.log(jsonData);
                        pub(jsonData)
                    }
                    else{
                        console.log(err);
                    }
                })
            })
        }
    
    })

})