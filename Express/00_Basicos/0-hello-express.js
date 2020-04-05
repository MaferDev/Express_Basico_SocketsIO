const express = require('express'),
 app = express()

app
 .get('/',(req,res)=>res.end('<h1>Hola Mundo desde Express.js</h1>'))
 .listen(3000,()=>console.log('Iniciando Express.js en el puerto 3000'))