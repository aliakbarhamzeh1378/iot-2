const express = require("express");
const router = express.Router();
const plantController = require("./plantController");
const multer = require("multer");
const upload = multer({ dest: "../../public/uploads/" });  //where to store the files
const {MiddleWare}=require("../../lib/middleware")

router.get("/lists", 
[MiddleWare.existToken],
plantController.listOfPlants);

router.get("/lists/:plantId", 
[MiddleWare.existToken],
plantController.findPlantById);

router.post("/new", 
[MiddleWare.existToken],
upload.single("image"), plantController.createNewPlant);


router.post(
    "/remove/:id",
    [MiddleWare.existToken],
    plantController.delete
);

router.put(
    "/update/:id",
    [MiddleWare.existToken],
    plantController.update
);
module.exports = router;
