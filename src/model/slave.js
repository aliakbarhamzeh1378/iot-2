const mongoose = require("mongoose");
const slaveSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Types.ObjectId 
    },
    slaveId : {
        type : String,
        required : true ,
        unique : true
    },
    slaveName : {
        type : String,
        required : true ,
    },
    masterId : {
        type : String,
        required : true 
    },
    plantId :{
        type : String, 
        ref : "plants" ,
    }   
});

slaves = mongoose.model("slaves" , slaveSchema) ;
module.exports = {slaves};