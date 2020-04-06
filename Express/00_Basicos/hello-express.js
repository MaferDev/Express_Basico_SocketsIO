const express = require('express'),
 app = express()


app
  .get('/',(req,res)=>res.end('<h1>Hola Mundo desde Express.js</h1>'))
  .get('/users',(req,res)=>{
    // Se utiliza rutas y configura el tipo de contenido q tiene la pagina
    res
    .set({'content-type':'text/html; charset=utf8'})
    .end('<h1>Hola estas en la sección de usuarios.</h1>')
  })
  .get('/users/:id-:name-:age',(req,res)=>{
    // /users/19-fer-28
    //Se lee los parametro de una url mediante params
    res
      .end(`
        <h1>Hola ${req.params.name} Bienvenido a ExpresJS!</h1>
        <p>Tu id de usuario es ${req.params.id}</p>
        <p>Tu edad es ${req.params.age}</p>
      `)
  })
  .get('/search', (req,res)=>{
    //search?s=Una+busqueda
    //Se lee los parametros en la url mediante Query
    res
      .end(`
        <h1>Bienvenido a ExpresJS!</h1>
        <p>Los resultado de la busqueda: <b>${req.query.s}</b></p>
      `)
  })
  .listen(3000,()=>console.log('Iniciando Express.js en el puerto 3000'))