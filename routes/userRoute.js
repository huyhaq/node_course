const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();
const authenticateMiddleware = require("../middlewares/authenticateMiddleware");
const createUserRequest = require("../requests/users/createUserRequest");




router.get("/",authenticateMiddleware, userController.listUser);

router.get("/create", userController.createUser);

router.post("/store",createUserRequest, userController.storeUser);

router.post("/delete/:id", userController.deleteUser);

router.get("/show/:id", userController.showUser);

router.get("/edit/:id", userController.editUser);

router.post("/update/:id", userController.updateUser);

module.exports = router;