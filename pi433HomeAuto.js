function log(message) {
	console.log('pi433HomeAuto-' + (new Date()).toISOString() + ': ' + message);
}
log('Started up.');

var settings = require('./settings.js'),	// Change this to setup app
  flash = require('connect-flash'),
  express = require('express'),
  passport = require('passport'),
  util = require('util'),
  GoogleStrategy = require('passport-google').Strategy,
  childProcess = require('child_process');
  
var child = childProcess.fork(__dirname + '/switches.js');
child.on('message', function(message) {
	console.log('     App: Message from switches:' + message.body);
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    returnURL: settings.host + ':' + settings.port + '/' + 'auth/google/return',
    realm: settings.host + ':' + settings.port
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
	  
	  var found = false;
	  found = (settings.users.indexOf(profile.emails[0].value) > -1);
	  
	  if (found) {
		  profile.identifier = identifier;
		  log("Login for user " + profile.emails[0].value);
		  return done(null, profile);
	  } else {
		return done(null,false,{ message: 'Not authorised' });
	  }

    });
  }
));

var app = express();

// configure Express
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
		child.send({
			body: user + ' sets ' + group + ',' + swtch + ' to state ' + state, 
			g:group, 
			s:swtch, 
			st:state,
			user:user
		});
	}
  }
);

app.get('/logout', function(req, res){
  log("Logout for user " + req.user.emails[0].value);
  req.logout();
  res.redirect('/');
});

log('Starting up server listening on port ' + settings.port);
app.listen(settings.port);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}