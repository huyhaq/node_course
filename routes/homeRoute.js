const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");

router.get("/user",authenticateMiddleware, homeController.index);
module.exports = router;