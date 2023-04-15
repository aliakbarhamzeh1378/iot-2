const express = require("express");
const router = express.Router();
const slaveController = require("./slaveController");
const { MiddleWare } = require("../../lib/middleware")

router.post("/slave",
    [MiddleWare.checkToken, MiddleWare.emptyCheck],
    slaveController.add);

router.delete("/slave",
    [MiddleWare.checkToken]
    , slaveController.delete)

router.put("/slave",
    [MiddleWare.checkToken]
    , slaveController.update);

router.get("/slave",
    [MiddleWare.checkToken]
    , slaveController.data);

module.exports = router;
