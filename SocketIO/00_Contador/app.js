/**
 * Socket.IO:
 * 1) Evento connection y disconnect
 * 2) Puedes crear tus propios eventos.
 * 3) emit() => cuando se comunica un mensaje a todos los clientes conectados.
 * 4) broadcast.emit() => cuando se comunica un mensaje a todos los clientes,
 *    excepto al que lo origina.
 * 5) Los 4 puntos anteriores funcionan en el servidor y en el cliente.
 */
const c= console.log,
 http = require('http').createServer(server),
 fs = require('fs'),
 io = require('socket.io')(http)

let connection = 0

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
// El metodo connection permite maantener la conexion de los web
// sockets de la app tanto del lado del cliente como del servidor.
io.on('connection',socket=>{
 //Se emite el mensaje
 socket.emit('connection',{message:'Hello World with Socket IO'})
 
 
 //Se recepciona el mensaje
 socket.on('other event',data=>c(data))


 connection++

 //Se detecta la connexión y se suma uno
 c(`Active Connections: ${connection}`)
 socket.emit('connect users',{connection})
 socket.broadcast.emit('connect users',{connection})

 //Se reconoce la desconexión y se quita una connexion
 socket.on('disconnect',()=>{
  connection--
  c('Disconected')
  c(`Active Connections: ${connection}`)
  socket.broadcast.emit('connect users',{connection})
})
})
