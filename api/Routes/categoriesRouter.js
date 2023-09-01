const express = require("express");
const categoriesController = require("../Controllers/categories");
const { authenticate } = require("../Middleware/auth");
const router = express.Router();

router.get("/load", categoriesController.load);
module.exports = router;