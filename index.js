const express = require("express"); // khai bao express
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const flash = require("express-flash");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const Category = require("./models/category");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cors = require('cors');

// router
const userRouter = require("./routes/userRoute");
const homeRoute = require("./routes/homeRoute");
const apiRoute = require("./routes/apiRoute");

// app
const app = express(); // tao instance express
const port = process.env.PORT || 4000; // if not env default 4000
dotenv.config();
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(flash());
app.use(expressLayout);

const mongoURL = "mongodb://localhost:27017/ecomerge";
app.use(cors());


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
// Route
app.use(async (req, res, next) => {
   const categories = await Category.find({}); 
   res.locals.categories = categories;
   next();
});

app.use('/',homeRoute);

app.use('/api', apiRoute);


app.get("/error", async (req, res) => {
    res.send("error");
  });


app.get('/logout', (req, res) => {

})

// viet edit, update`