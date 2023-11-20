const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

router.post("/login", apiController.login);
router.post("/resfresh", apiController.refreshToken);
module.exports = router;