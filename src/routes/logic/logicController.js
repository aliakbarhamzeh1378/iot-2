const {logicParse}=require("../../logic/parseLogic")
module.exports={
    getLogic:(req,res,next)=>{
        logicJson=JSON.parse(req.body);
        let result=logicParse(logicJson);

    }
}