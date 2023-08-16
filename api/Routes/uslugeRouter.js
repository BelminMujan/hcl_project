const express = require("express");
const uslugeController = require("../Controllers/usluge");
const { authenticate } = require("../Middleware/auth");
const router = express.Router();

router.post("/objavi", authenticate, uslugeController.dodajUslugu);
router.get("/load", authenticate, uslugeController.loadForUser);
module.exports = router;