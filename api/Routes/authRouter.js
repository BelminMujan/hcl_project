const express = require("express");
const authController = require("../Controllers/auth");
const { authenticate } = require("../Middleware/auth");
const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/auto_login", authenticate, authController.auto_login);
router.post("/update_profile", authenticate, authController.update_profile);
module.exports = router;