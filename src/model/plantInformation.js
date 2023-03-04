const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
    plantID : {
        type : String,
        require : true
    }
    // information : {
    //     type : Object ,
    //     require : true
    // }
});

plantsInformation = mongoose.model("plantsInformation" , plantSchema);

module.exports = {plantsInformation} ;