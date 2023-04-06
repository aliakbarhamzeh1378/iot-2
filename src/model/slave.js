const mongoose = require("mongoose");
const slaveSchema = new mongoose.Schema({
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
        type : mongoose.Types.ObjectId , 
        ref : "plants" ,
    },
    userId :{
        type : mongoose.Types.ObjectId , 
    }
   
});

slaves = mongoose.model("slaves" , slaveSchema) ;
module.exports = {slaves};