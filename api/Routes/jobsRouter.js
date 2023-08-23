const express = require("express");
const jobsController = require("../Controllers/jobs");
const { authenticate, maybeAuthenticate } = require("../Middleware/auth");
const router = express.Router();

router.get("/", maybeAuthenticate, jobsController.get);
router.get("/:type", authenticate, jobsController.get);
router.get("/details/:id", authenticate, jobsController.details);
router.get("/save/:id", authenticate, jobsController.save_job);
router.get("/remove_saved/:id", authenticate, jobsController.remove_saved_job);
router.post("/objavi", authenticate, jobsController.objavi_oglas);
router.get("/delete/:id", authenticate, jobsController.izbrisi_oglas);
module.exports = router;