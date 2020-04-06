const express = require('express'),
  createError = require('http-errors'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  favicon = require('serve-favicon'),
  session = require('express-session'),
  sassMiddleware = require('node-sass-middleware'),
  browserify_express = require('babelify-express'),
  hbs = require('hbs'),
  hbsHelpers = require('./views/helpers'),
  routes = require('./routes/index'),  
  app = express()

/* 
  Para configurar la app hay:
  set: Establecer parametros
  Use: Para trabajar con midelware
  get: Obtener alguna característica de la app
*/
app
  .set('port',(process.env.PORT||3000))
  .set('views',`${__dirname}/views`)
  .set('view_engine','hbs')
  .use(favicon(`${__dirname}/public/img/favicon.png`))
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({extended:false}))
  .use(cookieParser())
  .use(session({
    secret:'asasasas',
    saveUninitialized:true,
    resave:true
  }))
  .use(sassMiddleware({
    src:`${__dirname}/public`,
    dest:`${__dirname}/public`,
    indentedSyntax:false, // true=.sass and false = .scss
    sourceMap:true,
    outputStyle:'compressed'
  }))
  .use(browserify_express({
    entry:`${__dirname}/public`,
    watch:`${__dirname}/public/js/`,
    mount:`/js/script.js`,
    verbose:true,
    minify:true,
    bundle_opts:{debug:true}
  }))
  .use(express.static(`${__dirname}/public`))
  .use(routes)
  .use((req,res,next)=>next(createError(404)))
  .use((err,req,res,next)=>{
   res.status(err.static||500)
   res.render('error',{err})
  })

module.exports = app