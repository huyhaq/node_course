const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');
const path = require('path');
const os = require('os');
const url = require('url');

// console.log(process.env)

const apiURL = process.env.API_URL;

console.log(apiURL);

//crawl

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(__dirname);
// console.log(__filename);

//  assets/image/img1,...
// fs.readFile('./data.txt','utf-8',(err,data)=>{
//     console.log(data);
// })
// let fileContent = 'No;i dung data';
// fs.writeFile('./data.txt',fileContent,(err,data)=>{
//     if(err){
//         console.log(err);
//     }
//     return;
// })