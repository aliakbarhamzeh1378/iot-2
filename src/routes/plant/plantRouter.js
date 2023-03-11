const express = require("express");
const router = express.Router();
const plantController = require("./plantController");
const multer = require("multer");
const upload = multer({ dest: "../../public/uploads/" });  //where to store the files


router.get("/lists", plantController.listOfPlants);

router.get("/lists/:plantId", plantController.findPlantById);

router.post("/new", upload.single("image"), plantController.createNewPlant);


router.post(
    "/remove/:id",
    plantController.delete
);

router.put(
    "/update/:id",
    plantController.update
);
module.exports = router;
