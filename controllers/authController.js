
class AuthController{
    async postLogin (req, res){
        req.session.user = {
          name: "huyhq",
          age: 18,
        };
        req.flash("message", "Login success");
        res.redirect("/");
      };
      
      async getLoginForm (req, res) {
        res.render("login");
      };
}
const authController = new AuthController();
module.exports = authController;