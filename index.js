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
const passport = require("passport");
const Category = require("./models/category");
const User = require("./models/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// router
const userRouter = require("./routes/userRoute");
const homeRoute = require("./routes/homeRoute");
const authRoute = require("./routes/authRoute");

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

// cho phép lưu lại thông tin xác thực mỗi request nhưng không xác thực mỗi request
app.use(passport.initialize());
// cho phép passport được sử dụng session 
app.use(passport.session());
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

  // passport
  const localStrategy = new LocalStrategy(
    async function(username, password, done) {
      console.log(username)
      const user =  await User.findOne({ email: username });
      if (!user) { return done(null, false, {message: 'không có người dùng.'}); } // không có người dùng
      // pass: 1234556 => ma hoa => $2b$10$DrQYAR2nZLeoSGYPsIwujO
      // pass mahoa: $2b$10$DrQYAR2nZLeoSGYPsIwujO3qHnuy./DnW7P1kt3dQ/Iiq31Aa4/N6
      const status = await bcrypt.compare(password, user.password);
      // status = true , passs=> ma hoa = pass db
      // status = sai
      console.log(status)
      if (!status) { return done(null, false, {message: 'password sai.'}); } // pass không đúng
      return done(null, user); // đăng nhập thành công
    }
  );

  passport.use(localStrategy);


// cách lưu trạng thái xác thực
passport.serializeUser(function(user,done){
  done(null, user._id);
});
// lấy thông tin người dùng
passport.deserializeUser(async function(id,done){
  const user = await User.findById(id);
  done(null, user);
})

// Route
app.use(async (req, res, next) => {
   const categories = await Category.find({}); 
   res.locals.categories = categories;
   next();
});



app.use('/',homeRoute);
app.use('/',authRoute);
app.use('/users', userRouter);



function checkLogin(req, res, next) {
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/login');
  }
}

app.get("/error", async (req, res) => {

    res.send("error");
  });

  app.get("/post",checkLogin, async (req, res) => {
    res.render("post");
  });

app.get('/logout', (req, res) => {
  res.session.user = null;
  req.logout(()=>{
   res.redirect('/');
  });

})

// viet edit, update`
app.post('/login',(req,res)=>{
    const user = req.body;
    const userResult = User.findOne({email: user.email});
    if(userResult && bcrypt.compareSync(user.password, userResult.password)){
      req.session.user = userResult;
  
      res.redirect('/')
    }else{
      res.redirect('/login')
    }
});
