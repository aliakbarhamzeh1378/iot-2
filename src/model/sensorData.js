const mongoose = require("mongoose");
const plantSensorDataSchema = new mongoose.Schema({

    value: [
        {

        }],
    slaves: {
        type: mongoose.Schema.Types.ObjectId, ref: 'slaves',
        required: true
    }
});

const PlantSensorData = mongoose.model("PlantSensorData", plantSensorDataSchema);
module.exports = { PlantSensorData };
