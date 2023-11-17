
class HomeController{

    async index(req, res) {
        let message = req.flash.message;
        console.log('userLogin: ',req?.user)
        res.render("index", { message: message });
    }
}
const homeController = new HomeController();
module.exports = homeController;