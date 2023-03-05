const plantController = require("./plantController");
const router = require("express").Router()

module.exports = (app)=>{
    router.post(
        "/new",
        plantController.createNewPlant
    );
    
    router.post(
        "/remove/:id",
        plantController.delete
    );
    
    router.post(
        "/update/:id",
        plantController.update
    );
};
