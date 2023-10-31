const express = require('express');// khai bao express
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')

const app = express();// tao instance express
const port = process.env.PORT || 4000;// if not env default 4000
dotenv.config();
app.use(bodyParser.json());

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
        title:'aa',
        user_id:1,
    }
   ]

function authMiddleware  (req, res, next){    
    const header = req.headers['authorization'];
    const token = header ? header.split(" ")[1] : "";
    // check token
    if(!token){
        console.log('khong cos token')
        return res.json({message:'Unauthorized'}, 401);
    }
    console.log('co token');
// check user co trong token
    jwt.verify(token, process.env.JWT_KEY, (err, data)=>{
        if(err){
            console.log('loi roi token het han')
            return res.sendStatus(401);
        }
        console.log('user token:', data);
        // set user vao request
        req.user = data
        next();
    });
}
app.get('/api/users',authMiddleware, (req, res)=>{
// lay user dang nhap vao de xu ly ví dụ lấy bài post của user dang nhap
    console.log(req.user);     
    res.json(users);     
});
// user => ma hoa + khoa bi => token
// req => token => middleweare => gia ma token => user => di tiep +=> o tra 401

// 401 
app.post('/api/login', (req, res)=>{
    const user = req.body; 
    if(!user?.email)
    {
        return res.json({message: "Invalid user"});
    }
    const userResult = users.find(async item =>{
        let isRightPass = await bcrypt.compare(user.password, item.password);
       
        return item.email === user.email && isRightPass;
    })
    if(!userResult){
        return res.json({message: "Invalid user"});
    }
    console.log(userResult)
    const accessToken = jwt.sign(userResult,process.env.JWT_KEY, {expiresIn:'3h'});
    return res.json({
        access_token: accessToken
    })
});










app.listen(port, ()=>{
    console.log("run in port " + port);
});
