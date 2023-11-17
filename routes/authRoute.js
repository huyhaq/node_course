const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");

router.get("/login", authController.getLoginForm);
router.post('/login', passport.authenticate('local', { 
    failureRedirect: '/login',
    successRedirect:'/',
    failureFlash: true
  }));
// router.post("/login", authController.postLogin);
module.exports = router;