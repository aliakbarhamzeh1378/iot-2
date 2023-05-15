const mongoose = require("mongoose");
const plantSensorDataSchema = new mongoose.Schema({

    value: [
        {

        }],
    slaves: {
        type: String,
        required: true
    },
    time : Date
});

const PlantSensorData = mongoose.model("PlantSensorData", plantSensorDataSchema);
module.exports = { PlantSensorData };
