let {logicParse}= require("../logic/parseLogic");
async function x(){
    let data=await logicParse();
    slaveId=data[0].toLowerCase();
    console.log(slaveId)
    let commnd=data[1];
    // try{
        let boardData=require(`./${slaveId}.js`);
        // console.log(boardData)
        // if (commnd.includes("fan")){
    
        // }
    // }
    // catch{
    //     console.log("can't find required file")
    // }
   
}
x()