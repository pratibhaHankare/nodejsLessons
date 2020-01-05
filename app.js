const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{ // creating server
   // process.exit(); // used to exit the process

   /**Raw logic how node works with forms */
    const url = req.url;
    const method = req.method;
    if(url ==='/'){
        res.write(`<html><head><title>Meassge sender</title></head><body><h2>Message sender</h2><form method="POST" action="/message"><input type="text" name="message"><button type="submit">Send</button></button></form></body></html>`);
        return res.end()
    }
    // have to be recevie
    if(url === '/message' && method === 'POST'){
        const body =[];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
       /* below implemetations comes under blocking code. function `writeFileSync` blocks the code
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('meassge.txt',message);
        });
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();*/

        return req.on('end',()=>{
           const parsedBody = Buffer.concat(body).toString(); 
           const meassge = parsedBody.split("=")[1];
           fs.writeFile('message.txt',meassge,val=>{
            res.statusCode = 302;
            res.setHeader('Location','/');
            return res.end();
           });
        });
    }

   //setting response
   res.setHeader('Content-type','text/html');
   res.write(`<html><head><title>My first server response</title></head>`);
   res.write(`<body><h1>first repsonse from server</h1></body>`);
   res.write(`</html>`);
   res.end();
});

server.listen(3000);