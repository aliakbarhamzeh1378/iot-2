const {SlaveService} = require("../../services/slaveService");
const {slaves} = require("../../model/slave");
const {Token} = require("../../lib/token");
const token = new Token;

module.exports = {
    
    add : async function(req,res){
        let plantID = await plants.findById(req.body.plantId);
        if (plantID!=null){
            let findSlave = await slaves.findOne({slaveId : req.body.slaveId})
            if(findSlave==null){
                let userId = req.decoded.id
                SlaveService.addNewSlave(req ,plantID,userId)
                .then((message)=>{
                    return res.status(201).send({
                        status : "Ok" ,
                        message : "Add Slave",
                        data : {}
                    })
                })
                .catch((message)=>{
                    return res.status(406).send({
                        status : "error",
                        message : "There is a problem to add the slave" , 
                        data : {}
                    })
                })
            }else{
                return res.status(404).send({
                    status : "error" , 
                    message : "There is a slave with this id" ,
                    data : findSlave
                })
            }
        }else{
            return res.status(404).send({
                status : "error" , 
                message : "There isn't such plant" ,
                data : {}
            })    
        }
    },


    delete : async function(req,res){
        await SlaveService.deleteSlave(req) 
        .then((message)=>{
            return res.status(200).send({
                status : "Ok" ,
                message : message,
                data : {}
            })
        })
        .catch((message)=>{
            return res.status(404).send({
                status :"error",
                message : message ,
                data : {}
            })
        });
    
    },


    update : function(req,res){
        SlaveService.updateSlave(req)
        .then((message)=>{
            return res.status(200).send({
                status : "Ok" ,
                message : message ,
                data : {}
            })
        })
        .catch((message)=>{
            return res.status(404).send({
                status : "error" ,
                message : message , 
                data:{}
            })
        });
    },

    data : function(req,res){
        let checkToken = token.verifyToken(req.headers["authorization"])
        .then((message)=>{
            let getDataOfSlave = SlaveService.getData(req)
            .then((message)=>{
                return res.status(200).send({
                    status : "Ok" ,
                    message : "get data",
                    data : message
                })
            })
            .catch((message)=>{
                return res.status(404).send({
                    status : "error" ,
                    message : message ,
                    data : {}
                })
            })
    }) 
       .catch((message)=>{
        return res.status(404).send({
            status : "error",
            message :  "token expired or not found" ,
            data : {}
        })
    })
    }
}