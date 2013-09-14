/**
 * This class handles the main init of the app, starting up the express+passport web-handler
 * and then instantiating a new pi433HomeAuto instance which handles the rest.
 */

/**
 * Main nodeJS requirements
 */
var settings = require('./settings.js'),	// Change this to setup app
  pi433HomeAuth = require('./pi433HomeAuto.js'),
  flash = require('connect-flash'),
  express = require('express'),
  passport = require('passport'),
  util = require('util'),
  GoogleStrategy = require('passport-google').Strategy;


// Initialise a new instance of pi433HomeAuto and child switch controller
var homeAuto = new pi433HomeAuto();

/**
 * Passport config
 * 
 */
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    returnURL: settings.host + ':' + settings.authPort + '/' + 'auth/google/return',
    realm: settings.host + ':' + settings.authPort
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
	  var found = false;
	  found = (settings.users.indexOf(profile.emails[0].value) > -1);
	  if (found) {
		  profile.identifier = identifier;
		  homeAuto.log("Login for user " + profile.emails[0].value);
		  return done(null, profile);
	  } else {
		return done(null,false,{ message: 'Not authorised' });
	  }
    });
  }
));

/**
 * Express config & handlers
 */
var app = express();

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'sdfsd76saekljasdf5JKGyu5Ulfaasdhg2a' }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use('/static', express.static(__dirname + '/static'));
  app.disable('x-powered-by');
});

app.get('/', ensureAuthenticated, function(req, res){
  res.render('index', { user: req.user, switches: settings.switches });
});

app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/return', passport.authenticate(
	'google', { successRedirect: '/', failureRedirect: '/login', failureFlash: true}));

app.get('/login', function(req, res){
  res.render('login', { user: req.user, message: req.flash('error') });
});

app.post('/switch', ensureAuthenticated,
  function(req, res) {
	var group = req.body.g;
	var swtch = req.body.s;
	var state = req.body.st;
	var user = req.user.emails[0].value;
	
	// paranoid final user check
	if (settings.users.indexOf(req.user.emails[0].value) > -1) {
		homeAuto.setSwitch(user, group, swtch, state);
	} 
	res.end("Ok");
	
  }
);

app.get('/logout', function(req, res){
  var user = "unknown";
  if (req.user && req.user.emails && req.user.emails.length == 1) {
	  user = req.user.emails[0].value;
  }
  homeAuto.log("Logout for user " + user);
  req.logout();
  res.redirect('/');
});

homeAuto.log('Starting up server listening on port ' + settings.port);
app.listen(settings.port);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}