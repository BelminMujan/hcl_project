const express = require("express");
const uslugeController = require("../Controllers/usluge");
const { authenticate } = require("../Middleware/auth");
const router = express.Router();

router.post("/objavi", authenticate, uslugeController.dodajUslugu);
router.get("/load", authenticate, uslugeController.loadForUser);
router.get("/load_all", authenticate, uslugeController.loadAll);
router.get("/delete/:id", authenticate, uslugeController.deleteUsluga);
module.exports = router;