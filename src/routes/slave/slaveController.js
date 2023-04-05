const {SlaveService} = require("../../services/slaveService");
const {slaves} = require("../../model/slave");
const {Token} = require("../../lib/token");
const token = new Token;

module.exports = {
    
    add : async function(req,res){
        // let checkToken = token.verifyToken(req.headers["authorization"])
        // .then(async(message)=>{
            let findSlave = await slaves.findOne({slaveId : req.body.slaveId})
            if(findSlave==null){
                let craeteSlave = SlaveService.addNewSlave(req)
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
        // })
        // .catch((message)=>{
        //     return res.status(404).send({
        //         status : "error" ,
        //         message : "token expired or not found",
        //         data : {}
        //     })
        // })

    },

    delete : async function(req,res){
        let findToken = token.verifyToken(req.headers["authorization"])
        .then(async(message)=>{
        let callDeleteSlave = await SlaveService.deleteSlave(req) 
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
    })
    .catch((message)=>{
        return res.status(404).send({
            status : "error" , 
            message : "token expired or not found" ,
            data : {}
        })
    })

    },
    update : function(req,res){
        let checkToken = token.verifyToken(req.headers["authorization"])
        .then((message)=>{
        let updateInformation =SlaveService.updateSlave(req)
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
    })
    .catch((message)=>{
        return res.status(404).send({
            status : "error",
            message :  "token expired or not found" ,
            data : {}
        })
    })
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