const mongoose = require("mongoose");
const plant = require("./plant");

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
    plant :{
        type : mongoose.Types.ObjectId , 
        ref : "plant" ,
    },
    userId :{
        type : mongoose.Types.ObjectId , 
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