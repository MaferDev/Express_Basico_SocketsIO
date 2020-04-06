const app = require('./app'),
  c = console.log

  app.listen(
    app.get('port'),
    ()=>c(`Iniciando express en el puerto ${app.get('port')} `)
  )