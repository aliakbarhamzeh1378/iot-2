const { hash } = require("bcrypt");
const mongoose = require("mongoose");
const hashSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  hash: {
    type: String,
    required: true,
  },

  time_created: Date,
});

const hashs=mongoose.model("hashs",hashSchema);

module.exports = { hashs };
