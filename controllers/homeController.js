const User = require("../models/user");

class HomeController{

    async index(req, res) {
        let message = req.flash.message;
       const users = await User.find({});
        res.json({
            users
        })
    }
}
const homeController = new HomeController();
module.exports = homeController;