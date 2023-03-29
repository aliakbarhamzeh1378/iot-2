const express=require("express");
const router=express.Router();
const masterController=require("./masterController");
const {MiddleWare}=require("../../lib/middleware");

router.post("/master",[MiddleWare.existToken,MiddleWare.emptyCheck],masterController.addMaster);

router.delete("/master/:id",[MiddleWare.existToken],masterController.deleteMaster);

router.get("/master/:id",[MiddleWare.existToken],masterController.readMaster);

router.put("/master/:id",[MiddleWare.existToken],masterController.updateMaster);


module.exports=router