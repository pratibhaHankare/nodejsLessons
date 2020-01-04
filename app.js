const http = require('http');

const server = http.createServer((req,res)=>{ // creating server
  //  console.log(req);
  //  console.log(req.url,req.method,req.headers);
   // process.exit(); // used to exit the process
   //setting response
   res.setHeader('Content-type','text/html');
   res.write(`<html><head><title>My first server response</title></head>`);
   res.write(`<body><h1>first repsonse from server</h1></body>`);
   res.write(`</html>`);
   res.end();
});

server.listen(3000);