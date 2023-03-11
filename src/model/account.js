const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  actions: {
    type: Array,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
  },
  permission:{
    type:String,
    default:"Admin"
  }
});

const accounts = mongoose.model("accounts", accountSchema);
module.exports = { accounts };
