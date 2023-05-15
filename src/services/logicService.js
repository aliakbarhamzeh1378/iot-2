// let fs = require("fs");
// let {RedisService}=require("./redisService");
// let redisObj = new RedisService();
// class LogicService{
//     constructor(){
//         fs.writeFileSync("saved_data_file.json",'' , (err,result)=>{
//             if(err){
//                 console.log(err)
//             }else{
//                 console.log("Create file")
//             }
//         })
//     }

//     addData(data){
//         const file = fs.readFileSync("./saved_data_file.json" , (err , result)=>{
//             if(err) console.log(err)
//             else{
//                 console.log("Read file")
//             }
//         });
//         if(file.length==0){
//             fs.writeFileSync("./saved_data_file.json", JSON.stringify([data]).replace(/\band\b/,"&&").replace(/\bor\b/,"||").replace(/\bthen\b/,""));
//             console.log("saved data for first time")
//         }else{
//             const json_data = JSON.parse(file);
//             json_data.push(data);
//             fs.writeFileSync("./saved_data_file.json" , JSON.stringify(json_data).replace(/\band\b/,"&&").replace(/\bor\b/,"||").replace(/\bthen\b/,"") , (err)=>{
//                 console.log(err)
//             });
//             console.log("saved data")
//         };
//     }
//     compare(slaveId){
//         fs.readFile("../fs/saved_data_file.json" , (err,data)=>{
//             if(data){
//                 //convert string data into json
//                 const users = JSON.parse(data);
//                 users.forEach(async element => {
//                     if(slaveId== Object.keys(element).toString()){
//                         let list_check=[];
//                         let result_check;
//                         for(let value of Object.values(element)){
//                             for(let contentValue of value){
//                                 await redisObj.getData(`${slaveId}_${contentValue["content"]}`).then((message)=>{
//                                     let each_check = `${message}${contentValue["operator"]}${contentValue["value"]} ${contentValue["status"] }`;
//                                     list_check.push(each_check);
//                                     if(contentValue["message"]!=undefined){
//                                         result_check = contentValue["message"]
//                                     }
//                                 }).catch((message)=>{
//                                     console.log(message)
//                                 })
//                             }
//                         };
//                         const str =`if(${list_check.join(" ")}){console.log("${result_check}")}`;
//                         eval(str)
    
//                     }
//                     console.log("-------------------")
//                 });
        
//             }else{
//                 console.log(err);
//             }
//     })
//     }
// };

// module.exports = {LogicService};