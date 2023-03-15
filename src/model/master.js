const mongoose=require("mongoose");

const masterSchema = new mongoose.Schema({
  user_id: mongoose.Types.ObjectId,
  name: {
    type:Number,
    required:true
  }
});

const master=mongoose.model("master",masterSchema);

module.exports = { master };