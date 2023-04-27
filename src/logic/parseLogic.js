let fs=require("fs");
let {RedisService}=require("../services/redisService");
let redisObj=new RedisService();
let x=require("./logicText.json");
let insideIf="";
let result="";
let redisCondition=[];
let condition="";
async function logicParse(){
    for (let field of x){
        let slaveId=Object.keys(field).join("");
        for(let eachValue of Object.values(field).pop()){
            let editedvalues=Object.values(eachValue);
            editedvalues.forEach((item)=>{
                if (item=="and"){
                    let index=editedvalues.indexOf("and");
                    editedvalues[index]="&&"
                }
                else if (item=="or"){
                    let index=editedvalues.indexOf("or");
                    editedvalues[index]="||"
                }
                else if(item=="then"){
                    let index=editedvalues.indexOf("then");
                    result=editedvalues[index+1]
                    editedvalues.splice(index,index+1)
                }
            });
    
            let redisResult=await redisObj.getData(`${slaveId}_${editedvalues[0]}`);
            if(redisCondition.includes(`const ${editedvalues[0]}=${redisResult}`)==false){
                redisCondition.push(`const ${editedvalues[0]}=${redisResult}`)
            }
            insideIf+=editedvalues.join(" ")
        }
    
    }
    let jsCondition=redisCondition.join("\n")+`\nif(${insideIf}){console.log("${result}")}`;
    console.log(jsCondition)
    let writer=fs.createWriteStream("./text.js",{
        flags:"w"
    }).on("error",function(error){
        console.log(error)
    })
    writer.write(jsCondition)
}

logicParse()