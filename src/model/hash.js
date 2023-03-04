const { hash } = require("bcrypt");
const mongoose=require("mongoose");
const hashSchema=new mongoose.Schema({
    email:String,
    hash:String ,
    time_created:Date
});
const hashs=mongoose.model("hashs",hashSchema);

module.exports={hashs};