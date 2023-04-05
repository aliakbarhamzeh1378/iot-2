const express = require("express");
const router = express.Router();
const slaveController = require("./slaveController");
const { MiddleWare } = require("../../lib/middleware")

router.post("/slave",
    // [MiddleWare.existToken , MiddleWare.emptyCheck],
    slaveController.add);

router.delete("/slave",
    [MiddleWare.existToken]
    , slaveController.delete)

router.put("/slave",
    // [MiddleWare.existToken]
    slaveController.update);

router.get("/slave",
    // [MiddleWare.existToken]
    slaveController.data);

module.exports = router;
