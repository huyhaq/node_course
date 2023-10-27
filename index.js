const express = require('express');// khai bao express

const app = express();// tao instance express
const port = process.env.PORT || 4000;// if not env default 4000


app.use(authMiddleware);
//  req => middle => server
app.get('/',middlewareTest ,(req,res)=>{
    res.send('Hello Nodejs');
});

app.get('/post', (req,res)=>{
    res.send('Hello Posts');
});

function authMiddleware(req,res,next){
    console.log('Auth middle ware:'+req.url);
    if(req.url === '/post'){
       res.send('ERROR NOT LOGIN');
    }else{
        next();
    }
}

function middlewareTest(req,res,next){
    console.log('middleware:'+req.url);
    next();
}


app.listen(port, ()=>{
    console.log("run in port " + port);
});
// list:get view, show:get/get view, store: post, update: path/put,
// destroy:delete
// create:get view, edit:get view
// React => dang nhap => Nodejs => token
// REact => getuser + token => nodejs 
// REact => get User + token => refresh => req => node => user