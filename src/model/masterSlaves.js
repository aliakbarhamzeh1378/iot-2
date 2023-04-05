const mongoose = require("mongoose");

const savedSlavesSchema = new mongoose.Schema({
    time : Date ,
    value :String
});

const masterSavedSlaves = mongoose.model("masterSavedSlaves" , savedSlavesSchema);
module.exports = {masterSavedSlaves};