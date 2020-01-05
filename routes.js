const fs = require('fs');

const requestHandler=(req,res)=>{

   /**Raw logic how node works with forms */
   const url = req.url;
   const method = req.method;
   if(url ==='/'){
       res.write(`<html><head><title>Meassge sender</title></head><body><h2>Message sender</h2><form method="POST" action="/message"><input type="text" name="message"><button type="submit">Send</button></button></form></body></html>`);
       return res.end()
   }
   
   if(url === '/message' && method === 'POST'){
       const body =[];
       req.on('data',(chunk)=>{
           console.log(chunk);
           body.push(chunk);
       });

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
}

module.exports ={
    handler : requestHandler,
    someText:'some hard coded text'
} ;