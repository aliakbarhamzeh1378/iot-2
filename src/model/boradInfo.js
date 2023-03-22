const mongoose = require("mongoose") ;
const dataBordSchema = new mongoose.Schema({
    data : { 
        type : String,
        required : true
    }
    , 
    time : Date
});



const bordSchema = new mongoose.Schema({
    id : {
        type : mongoose.Types.ObjectId ,
        required : true
    },
    name : {
        type : String ,
        required : true
    },
    value : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "dataBord",
        required : true
    }],
});

const DataBord = mongoose.model("DataBord" , dataBordSchema);
const Board = mongoose.model("Board" , bordSchema);
module.exports = {Board , DataBord};