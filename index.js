const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    //post => views/post.html
    const path = req.url;
    console.log('path:'+path)
    let filePath = '';
    switch(path)
    {
        case '/post':
        filePath ='./views/post.html';
        break;
        default:
            filePath ='./views/index.html';
        break;
    }
    res.setHeader('Content-Type','text/html');
    fs.readFile(filePath, (err, data)=>{
        if(err)
        {
            console.log('error')
        }
        res.write(data);
        res.end();
    });
});

server.listen(4000, 'localhost',()=>{
    console.log('listening on port 4000');
})
//make directory