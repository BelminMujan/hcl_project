const express = require("express");
const jobsController = require("../Controllers/jobs");
const authenticate = require("../Middleware/auth");
const router = express.Router();

router.get("/", jobsController.get);
router.get("/:type", authenticate, jobsController.get);
router.get("/save/:id", authenticate, jobsController.save_job);
router.get("/remove_saved/:id", authenticate, jobsController.remove_saved_job);
router.post("/objavi", authenticate, jobsController.objavi_oglas);
router.get("/delete/:id", authenticate, jobsController.izbrisi_oglas);
module.exports = router;