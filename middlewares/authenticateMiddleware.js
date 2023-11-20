const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();
const jwtSecret = process.env.JWT_KEY;

module.exports = async function(req, res, next) {
  const header = req.headers['authorization'];
  const token = header && header.split(" ")[1] || "";

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = await jwt.verify(token, jwtSecret);
    const userFind = await User.findById(user._id);

    if (!userFind) {
      return res.status(401).json({ message: "Invalid User" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid User" });
  }
};
