const {logicParse}=require("../../logic/parseLogic");
const {pub}=require("../../mqtt/pub")
module.exports={
    getLogic:(req,res,next)=>{
        logicJson=JSON.parse(req.body);
        try{
            pub(logicParse)
            res.status(200).send({
            status:"ok",
            message:"ok your automation is executed",
            data:{} 
            })
        }
        catch{
            res.status(401).send({
                status:"error",
                message:"having problem to execute your automation",
                data:{} 
                })
        }
        
    }
}