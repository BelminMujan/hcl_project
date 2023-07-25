const express = require("express");
const jobsController = require("../Controllers/jobs");
const authenticate = require("../Middleware/auth");
const router = express.Router();

router.get("/", jobsController.get);
router.get("/:type", authenticate, jobsController.get);
module.exports = router;