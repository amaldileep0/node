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

const sequelizeClass = require('./sequelize');

//create a middleware for favicon
//var favicon = require('serve-favicon')

// Require common route file
var commonRoutes = require('./common/routes');

app.use(cookieParser());
app.use(expressLayouts);
app.use(flash());
app.use( express.json() );       // to support JSON-encoded bodies
app.use(express.urlencoded({extended: false})); 

var oneDay = 86400000; // in milliseconds
app.use(express.static(path.join(__dirname, 'public'),{
  maxage: oneDay
}));

app.use('/frontend/static', express.static('public/frontend'));
app.use('/frontend/images', express.static('public/images'));
app.use('/backend/static', express.static('public/backend'));
app.use('/backend/images', express.static('public/images'));

app.use(session({
  cookie: { maxAge: 6000000, secure: false },
  rolling: true,
  resave: true,
  saveUninitialized: true,
  secret: config.secretKey,
  expires: 6000000,
}));
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
module.exports = app;
