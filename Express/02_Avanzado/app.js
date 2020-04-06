const express = require('express'),
  app = express()

/* 
  Para configurar la app hay:
  set: Establecer parametros
  Use: Para trabajar con midelware
  get: Obtener alguna característica de la app
*/
app
  .set('port',(process.env.PORT||3000))
module.exports = app