const express = require("express");
const router = express.Router();
const plantController = require("./plantController");
const multer = require("multer");
const upload = multer({ dest: "../../public/uploads/" });  //where to store the files
const { MiddleWare } = require("../../lib/middleware");

router.get("/lists",
    [MiddleWare.checkToken],
    plantController.listOfPlants);


router.get("/lists/:plantId",
    [MiddleWare.checkToken],
    plantController.findPlantById);

router.post("/new",
    [MiddleWare.checkToken],
    upload.single("image"), plantController.createNewPlant);

router.get("/lists",
    [MiddleWare.checkToken],
    plantController.listOfPlants);



router.post("/new", upload.single("image"),
    [MiddleWare.checkFullPermission],
    plantController.createNewPlant);

router.delete(
    "/remove/:id",
    [MiddleWare.checkToken, MiddleWare.checkFullPermission],

    plantController.delete
);

router.put(
    "/update/:id",
    [MiddleWare.existToken, MiddleWare.checkFullPermission],
    plantController.update
);
module.exports = router;
