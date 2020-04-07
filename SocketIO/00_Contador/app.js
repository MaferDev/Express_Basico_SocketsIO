const c= console.log,
 http = require('http').createServer(server),
 fs = require('fs')


function server(req,res){
  fs.readFile('index.html',(error,data)=>{
   if(error){ 
    res.writeHead(500,{'Content-type':'text/html'})
    return res.end('<h1>Error Interno del Servidor</h1>') 
   }else{
    res.writeHead(200,{'Content-type':'text/html'})
    return res.end(data,'utf-8') 
    
   } 
  })
 }

http.listen(3000,c('Server on port 3000'))
