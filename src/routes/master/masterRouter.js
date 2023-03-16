const express=require("express");
const router=express.Router();
const masterController=require("./masterController");
const {MiddleWare}=require("../../lib/middleware");

router.post("/newMaster",[MiddleWare.existToken,MiddleWare.emptyCheck],masterController.addMaster);

router.get("/deleteMaster/:id",[MiddleWare.existToken],masterController.deleteMaster);

router.get("/readMaster/:id",[MiddleWare.existToken],masterController.readMaster);

router.put("/updateMaster/:id",[MiddleWare.existToken],masterController.updateMaster);


module.exports=router