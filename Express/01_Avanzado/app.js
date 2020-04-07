const express = require('express'),
  path = require('path'),
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

hbs.registerPartials(`${__dirname}/views/partials`,(err)=>{})


app
  .set('port',(process.env.PORT||3000))
  .set('views', path.join(__dirname,'views'))
  .set('view engine','hbs')
  .use(favicon(`${__dirname}/public/img/favicon.png`))
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({extended:false})) //Express obtenga los formularios de forma correcta
  .use(cookieParser())
  .use(session({
    secret:'shhhhhhhhh',
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
    entry:`${__dirname}/public/js/index.js`,
    watch:`${__dirname}/public/js/`,
    mount:`/js/script.js`,
    verbose:true,
    minify:true,
    bundle_opts:{debug:true}
  }))
  .use(routes)
  .use(express.static(`${__dirname}/public`))
  .use((req,res,next)=>next(createError(404)))
  .use((err,req,res,next)=>{
   res.status(err.static||500)
   res.render('error',{err})
  })

module.exports = app