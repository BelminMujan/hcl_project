const express = require("express");
const offerController = require("../Controllers/offers");
const { authenticate } = require("../Middleware/auth");
const router = express.Router();

router.post("/save", authenticate, offerController.save);
router.get("/:type", authenticate, offerController.load);
router.get("/change_status/:id/:status", authenticate, offerController.changeStatus);
module.exports = router;