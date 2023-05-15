const express=require("express");
const router=express.Router();
const masterController=require("./masterController");
const {MiddleWare}=require("../../lib/middleware");
const Role = require("../../lib/roles_list")

router.post("/master",
    [MiddleWare.checkToken,MiddleWare.emptyCheck , MiddleWare.verifyRoles(Role.ADMIN ,Role.SUPERADMIN)],
    masterController.addMaster);

router.delete("/master/:id",[MiddleWare.checkToken,MiddleWare.verifyRoles(Role.SUPERADMIN)],masterController.deleteMaster);

router.get("/master/:id",[MiddleWare.checkToken ,MiddleWare.verifyRoles(Role.ADMIN ,Role.SUPERADMIN)],masterController.readMaster);

router.put("/master/:id",[MiddleWare.checkToken , MiddleWare.verifyRoles(Role.ADMIN ,Role.SUPERADMIN)],masterController.updateMaster);


module.exports=router;