const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    require : true
  },
  email: {
    type: String,
    trim: true,
    require : true
  },
  password: {
    type: String,
    trim: true,
    require : true
  },
  status: {
    type: String,
    trim: true,
  },
});

const accounts = mongoose.model("accounts", accountSchema);
module.exports = { accounts };
