let cron=require("node-cron");
let fs=require("fs");

cron.schedule("* * * * *",()=>{
    fs.readdir(__dirname,(err,files)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(files)
            files.forEach(file=>{
                // console.log(__dirname(file))
                var x = require(`./${file}`)
                console.log(x)
            })
        }
    
    })

})