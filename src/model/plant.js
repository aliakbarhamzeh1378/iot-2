const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  // user_id: mongoose.Types.ObjectId,
  name: {
    type : String,
    required : true
  },
  image: {
    type : String,
    required : true
  }
  ,
  temperature: {
    type : Number,
    required : true
  },
  light: {
    type : Number,
    required : true
  },
  moisture: {
    type : String,
    required : true
  },
  explanation: {
    type : String,
    required : true
  },

});

plants = mongoose.model("plants", plantSchema);
module.exports = { plants };
