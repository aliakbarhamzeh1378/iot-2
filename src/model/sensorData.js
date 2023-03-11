const mongoose = require("mongoose");
const sensorValueSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    }
    ,
    time: Date
});



const plantSensorDataSchema = new mongoose.Schema({

    value: [
        {

        }],
    plant: {
        type: mongoose.Schema.Types.ObjectId, ref: 'plants',
        required: true
    }
});

// const SensorValue = mongoose.model("SensorValue", sensorValueSchema);
const PlantSensorData = mongoose.model("PlantSensorData", plantSensorDataSchema);
module.exports = { PlantSensorData };
