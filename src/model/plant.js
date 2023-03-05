const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  // user_id: mongoose.Types.ObjectId,
  name: String,
  image: String,
  temperature: Number,
  light: Number,
  moisture: String,
  explanation: String,
});

plants = mongoose.model("plants", plantSchema);
module.exports = { plants };
