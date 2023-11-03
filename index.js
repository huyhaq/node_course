const express = require('express');// khai bao express
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const ejs = require('ejs');
const path = require("path");
const session = require("express-session");
const app = express();// tao instance express
const port = process.env.PORT || 4000;// if not env default 4000
dotenv.config();
app.set('view engine','ejs');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:"keyboard cat",
    resave: false,
    saveUninitialized:true,// được dùng cả khi không đang nhập => false => được dùng khi đang 
}))

// lay du lieu db
const users = [{
    "name": "Mrs. Jackie Considine",
    "price": 88,
    "email":"huyhq",
    "password":bcrypt.hashSync("123456789",10),
    "color": "color 1",
    "detail": "detail 1",
    "id": "1"
   },
   {
    "name": "Ignacio Terry",
    "price": 29,
    "email":"huyhq1",
    "password":bcrypt.hashSync("123456789",10),//ndjkandkasndkasdnaskdna
    "color": "color 2",
    "detail": "detail 2",
    "id": "2"
   }];

   const posts = [
    {
        title:'post 1',
        user_id:1,
    },
    {
        title:'post 2',
        user_id:2,
    },
    {
        title:'post 3',
        user_id:3,
    }
   ]



app.get('/', (req,res)=>{
    // views/index.ejs
    let user = null;
    if(req.session.user){
        user = req.session.user;
    }

    let message= null;
    if(req.session.message){
        message = req.session.message;//
        req.session.message = null; //
    }
    // session user
    // user = session('user')
    res.render('index',{ userInView : user, message: message });
});

app.post('/login', (req,res)=>{
    
    req.session.user = {
        name:"huyhq",
        age:18
    };

    req.session.message = "Login success";
    res.redirect('/');
});

app.get("/login", (req,res)=>{
    res.render('login');
})

app.get('/post', (req,res)=>{
    res.render('post', {posts});
});



app.listen(port, ()=>{
    console.log("run in port " + port);
    console.log(path.join(__dirname, 'public'))
    
});