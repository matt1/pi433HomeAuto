var settings = require('./settings.js'),
  cronSchedule = require('./cron.js'),
  childProcess = require('child_process'),
  utils = require('./utils.js');

/**
 * Main automation handler 'class' for main automation bits and pieces and not the express/node
 * stuff.
 */
pi433HA = function() {
	this.switches;
	this.cron;
	
	// Start up child activity.
	this.startSwitches();
	this.startCron();
	this.log('Started up.');
};

/**
 * Log a message
 * 
 * @param message
 */
pi433HA.prototype.log = function(message) {
	utils.log(message, 'pi433HA');
};

/**
 * Start the child process for handling switching.
 */
pi433HA.prototype.startSwitches = function() {
	var self = this;
	this.switches = childProcess.fork(__dirname + '/switches.js');
	this.switches.on('message', function(message) {
		self.log('From switches: ' + message.body);
	});
};

/**
 * Start up the cron job scheduler and pass it a reference to the switches child object
 * @param switches
 */
pi433HA.prototype.startCron = function() {
	this.cron = new CronSchedule(this.switches);
};

/**
 * Set a switch state
 * 
 * @param user
 * @param groupId
 * @param switchId
 * @param state
 */
pi433HA.prototype.setSwitch = function(user, groupId, switchId, state) {
	this.switches.send({
		body: user + ' sets ' + groupId + ',' + switchId + ' to state ' + state, 
		g:groupId, 
		s:switchId, 
		st:state,
		user:user
	});
};