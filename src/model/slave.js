const mongoose = require("mongoose");
const plant = require("./plant");

const slaveSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    plantId :{
        type : Number , 
        ref : "plant" ,
        required : true
    },
    userId :{
        type : mongoose.Schema.Types.ObjectId , 
        required : true
    },
    tempSesor : {
        type : Number,
        required : true
    },
    lightSesor : {
        type : Number,
        required : true
    },
    ambientHumidSesor : {
        type : Number,
        required : true
    },
    soilHumidSesor : {
        type : Number,
        required : true
    },
    fanButton : {
        type : Boolean,
        required : true
    },
    lightButton : {
        type : Boolean,
        required : true
    },
    heatButton : {
        type : Boolean,
        required : true
    },
    waterPompButton : {
        type : Boolean,
        required : true
    }
});

slaves = mongoose.model("slaves" , slaveSchema) ;
module.exports = {slaves};