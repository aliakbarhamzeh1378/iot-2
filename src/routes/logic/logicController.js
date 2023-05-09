const {logicParse}=require("../../logic/parseLogic")
module.exports={
    getLogic:(req,res,next)=>{
        logicJson=JSON.parse(req.body);
        let writer=fs.createWriteStream("./text.js",{
            flags:"w"
        }).on("error",function(error){
            console.log(error)
        })
        writer.write(data)
    }
}