const express = require("express"); // khai bao express
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const flash = require("express-flash");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const User = require("./models/user");
// app
const app = express(); // tao instance express
const port = process.env.PORT || 4000; // if not env default 4000
dotenv.config();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());
app.use(expressLayout);

app.set("layout", "layouts/layout");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true, // được dùng cả khi không đang nhập => false => được dùng khi đang
  })
);
const mongoURL = "mongodb://localhost:27017/ecomerge";
// connect db

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connect success");
    app.listen(port, () => {
      console.log("run in port " + port);
      console.log(path.join(__dirname, "public"));
    });
  })
  .catch((err) => {
    console.log("connect error");
  });

app.get("/", async (req, res) => {
 let users = null;
  try {
     users = await User.find({});
  } catch (err) {
    res.redirect("/error");
  }
  let message = req.flash.message;
  res.render("index", { users: users, message: message });
});

app.get('/users/create',(req,res)=>{
    res.render("users/create");
})

app.post("/users/store", async (req, res) => {
  // views/index.ejs
  console.log(req.body)
  const pass = bcrypt.hashSync(req.body.password, 10);
  let dataCreate = req.body;
  dataCreate.password = pass;
  await User.create(dataCreate);
  req.flash("message", "Create success");
  res.redirect("/");
});
app.get("/error", async (req, res) => {
    res.send("error");
  });
app.post("/login", (req, res) => {
  req.session.user = {
    name: "huyhq",
    age: 18,
  };
  req.flash("message", "Login success");
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/post", (req, res) => {});

// viet edit, update`