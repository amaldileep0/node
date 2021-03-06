//gets the express framework into the application
var express = require('express');
// gets the middleware for path
var path = require('path'); 
var app = module.exports = express();
//Create cookieParser middleware for the application.
var cookieParser = require('cookie-parser')
//Create a session middleware with the given options.
var session = require('express-session')
//create flash middleware for the application.
var flash = require('connect-flash');
//Gets config middleware for the application.
var config = require('config');
//create middleware for layout support for ejs in express.
var expressLayouts = require('express-ejs-layouts');
// Authentication middleware
var passport = require('passport');
// Local Authentication middleware
var LocalStrategy = require('passport-local');
// Require common route file
var commonRoutes = require('./common/routes');
const sequelizeClass = require('./sequelize');
//api routes
var apiRoutes = require('./api/routes');
//Create a middleware for CSRF token creation and validation.
var csrf = require('csurf')

app.use(expressLayouts);
app.use( express.json() );// to support JSON-encoded bodies
// create api router
var api = createApiRouter()
//used here inorder to ignore api routes..
app.use(api)

// create api router,mount api before csrf is appended to the app stack
//app.use(createApiRouter)

//create a middleware for favicon
//var favicon = require('serve-favicon')

// setup route middlewares
app.use(session({
  cookie: { maxAge: 6000000, secure: false },
  rolling: true,
  resave: true,
  saveUninitialized: true,
  secret: config.secretKey,
  expires: 6000000,
}));


app.use(express.urlencoded({extended: false})); 
app.use(cookieParser());
app.use(csrf({ cookie: true }))

app.use(function (req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.locals.csrftoken = req.csrfToken();
  next();
});

var oneDay = 86400000; // in milliseconds
app.use(express.static(path.join(__dirname, 'public'),{
  maxage: oneDay
}));

app.use(flash());
app.use('/frontend/static', express.static('public/frontend'));
app.use('/frontend/images', express.static('public/images'));
app.use('/backend/static', express.static('public/backend'));
app.use('/backend/images', express.static('public/images'));


app.use(passport.initialize());
app.use(passport.session());

sequelizeClass.ormConnection(app);
sequelizeClass.User(app);

var User = require('./common/models/user'); 

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },(username, password, done) => {
      User.authenticate(username, password, done)
  })
);

passport.serializeUser((user, done) => { User.serializeUser(user, done)});
passport.deserializeUser((id, done) => {User.deserializeUser(id, done)});

app.set('layout extractScripts', true);
app.set('layout extractStyles', true);
//sets view path for frontend and backend
app.set('views', [__dirname + '/backend/views', __dirname + '/frontend/views']);
//sets view engine
app.set('view engine', 'ejs');

//loads all routes.
app.use('/', commonRoutes);

//support for cros
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});*/

// Handle 404
app.use(function(req, res) {
  res.status(404);
  res.render('error/404', {title: '404: File Not Found',layout: 'layouts/layout_errors'});
});
app.use(function(error, req, res, next) {
  if(error.name == 'UnauthorizedError'){
    res.status(401).json({
      error: "Your session has been expired."
    })
  } else if(error.code == 'EBADCSRFTOKEN'){
    res.render('error/403', {title:'403: Forbidden', error: error, layout: 'layouts/layout_errors'});
  } else {
    res.render('error/500', {title:'500: Internal Server Error', error: error, layout: 'layouts/layout_errors'});
  }
});

//this is done here ,because to avoid csrf protection
function createApiRouter() {
  var router = new express.Router()
  router.use('/api', apiRoutes);
  return router
}
module.exports = app;
