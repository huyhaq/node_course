
const User = require("../models/user");
const bcrypt = require("bcrypt");
const UserService = require('../services/userService');

class UserController {

    constructor()
    {
        this.userService = new UserService();
    }

    async listUser(req, res) {
        let users = null;
        try {
          users = await User.find({});
        } catch (err) {
          res.redirect("/error");
        }
        let message = req.flash.message;
        res.render("users/index", { users: users, message: message });
      }
    async createUser(req, res) {
      res.render("users/create");
    }
    async storeUser(req, res) {
      // views/index.ejs
      // view => router => middleware => controller => service => model => controller =>view
      let userService = new UserService();
      const user = await userService.store(req);
      req.flash("message", "Create success");
      res.redirect("/");
    }
    async  deleteUser(req, res) {
      const id = req.params.id;
      const user = await User.findByIdAndDelete(id);
      if (user) {
        req.flash("message", "Delete success:");
        res.redirect("/");
      } else {
        req.flash("message", "Delete error");
        res.redirect("/");
      }
    }
    async  showUser(req, res) {
      const id = req.params.id;
      const user = await User.findById(id);
      if (user) {
        res.render("users/show", { user });
      } else {
        req.flash("message", "user not found");
        res.redirect("/");
      }
    }
    
    async  editUser(req, res) {
      const id = req.params.id;
      const user = await User.findById(id);
      if (user) {
        res.render("users/edit", { user });
      } else {
        req.flash("message", "user not found");
        res.redirect("/");
      }
    }
    
    async updateUser(req, res) {
      const id = req.params.id;
      const dataUpdate = { ...req.body };
      delete dataUpdate.password;
      if (req.body.password) {
        dataUpdate.password = await bcrypt.hash(req.body.password, 10);
      }
      const userUpdate = await User.findByIdAndUpdate(id, dataUpdate, {
        new: true,
      });
      if (userUpdate) {
        req.flash("message", "update success:");
        res.redirect("/");
      } else {
        req.flash("message", "update error");
        res.redirect("/");
      }
    }
}


const userController = new UserController();
module.exports = userController;