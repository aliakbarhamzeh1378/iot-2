const express = require("express");
const router = express.Router();
const plantController = require("./plantController");
const multer = require("multer");
const upload = multer({ dest: "../../public/uploads/" });  //where to store the files
const { MiddleWare } = require("../../lib/middleware");

router.get("/lists", 
[MiddleWare.existToken],
plantController.listOfPlants);


router.get("/lists/:plantId", 
[MiddleWare.existToken,MiddleWare.checkFullPermission],
plantController.findPlantById);

router.post("/new", 
[MiddleWare.existToken],
upload.single("image"), plantController.createNewPlant);

router.get("/lists",
    [MiddleWare.checkFullPermission],
    plantController.listOfPlants);



router.post("/new", upload.single("image"),
    [MiddleWare.checkFullPermission],
    plantController.createNewPlant);

router.post(
    "/remove/:id",
    [MiddleWare.existToken,MiddleWare.checkFullPermission],

    plantController.delete
);

router.put(
    "/update/:id",
    [MiddleWare.existToken,MiddleWare.checkFullPermission],
    plantController.update
);
router.post("/addSensorData/", plantController.AddSensorData)
module.exports = router;
