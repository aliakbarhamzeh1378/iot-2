const mongoose=require("mongoose");

const masterSchema = new mongoose.Schema({
  user_id: mongoose.Types.ObjectId,
  master_id: {
    type:String ,
    required:true,
  },
  name:{
    type:String,
    required:true
  }
});

const master=mongoose.model("master",masterSchema);

module.exports = { master };