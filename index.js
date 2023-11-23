import express from "express" ; // khai bao express
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bodyParser  from "body-parser";
import ejs from "ejs";
import path from "path";
import session from "express-session";
import flash from "express-flash";
import expressLayout from "express-ejs-layouts";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// router
import homeRoute from "./routes/homeRoute";

// app
const app = express(); // tao instance express
const port = process.env.PORT || 4000; // if not env default 4000
dotenv.config();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());
app.use(expressLayout);

app.set("layout", "layouts/layout");

app.set("layout extractStyles", true)
app.set("layout extractScripts", true)

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true, // được dùng cả khi không đang nhập => false => được dùng khi đang
  })
);
const mongoURL = "mongodb://localhost:27017/ecomerge";

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
// app.use('/',homeRoute);

app.get("/error", async (req, res) => {
    res.send("error");
 });
app.get("/user",(req,res)=>{
  const userSearch = ;

  res.status(200).json({
    user_search:userSearch
  })
});

