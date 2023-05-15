const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    required : true
  },
  email: {
    type: String,
    trim: true,
    required : true
  },
  password: {
    type: String,
    trim: true,
    required : true
  },
  actions: {
    type: Array,
    trim: true,
    required : true
  },
  status: {
    type: String,
    trim: true,
    required : true
  },
  role:{
    type:String,
    default:"Admin"
  }
});

const accounts = mongoose.model("accounts", accountSchema);
module.exports = { accounts };
