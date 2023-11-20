const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();
const jwtSecret = process.env.JWT_KEY;

class ApiController {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid User", status_code: 401 });
      return;
    }
    const accessToken = jwt.sign(user.toObject(), jwtSecret, { expiresIn: "3h" });
    const refreshToken = jwt.sign(user.toObject(), jwtSecret);
    res.json({
      message: "Login successful",
      status_code: 200,
      user,
      access_token: accessToken,
      refresh_token: refreshToken,
    });
  }

  async refreshToken(req, res) {
    const header = req.headers['authorization'];
    const token = header ? header.split(" ")[1] : "";
    if (!token) {
      res.status(401).json({ message: "Invalid User", status_code: 401 });
      return;
    }
    jwt.verify(token, process.env.JWT_KEY,async (err, user)=>{
      if(err){
        res.status(401).json({ message: "Invalid User", status_code: 401 });
        return;
      }
      const userFind = await User.findById(user._id);
      if (!userFind) {
        res.status(401).json({ message: "Invalid User", status_code: 401 });
        return;
      }
      const accessToken = jwt.sign(userFind.toObject(), jwtSecret, { expiresIn: "3h" });
      const refreshToken = jwt.sign(userFind.toObject(), jwtSecret);
      res.json({
        message: "Login successful",
        status_code: 200,
        user:userFind,
        access_token: accessToken,
        refresh_token: refreshToken,
      });
  });

  }
}
const apiController = new ApiController();
module.exports = apiController;
