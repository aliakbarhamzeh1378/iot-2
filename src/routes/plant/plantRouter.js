const express = require("express");
const router = express.Router();
const plantController = require("./plantController");
const multer = require("multer");
const upload = multer({ dest: "../../public/uploads/" });  //where to store the files
const { MiddleWare } = require("../../lib/middleware");


router.get("/lists",
    [MiddleWare.checkFullPermission],
    plantController.listOfPlants);

router.get("/lists/:plantId",
    [MiddleWare.checkFullPermission],
    plantController.findPlantById);

router.post("/new", upload.single("image"),
    [MiddleWare.checkFullPermission],
    plantController.createNewPlant);


router.post(
    "/remove/:id",
    [MiddleWare.checkFullPermission],
    plantController.delete
);

router.put(
    "/update/:id",
    [MiddleWare.checkFullPermission],
    plantController.update
);
module.exports = router;
