var settings = require('./settings.js'),
  cronJob = require('cron').CronJob,
  utils = require('./utils.js');

/**
 * Create a new schedule manager that loads all of the jobs
 * 
 * @param switchesProcess The child_rpocess of the switches object
 */
CronSchedule = function(swicthesProcess) {
	var self = this;
	this.jobs = [];
	this.switches = swicthesProcess;
	
	// For each schedule entry, there might be multiple switches to change - create a cron
	// job for each schedule, which calls each switch in that schedule when it fires.
	settings.schedule.forEach(function(job) {

    	utils.log("Setting cron job: " + job.name + " - " + job.cron, 'Cron');
		var newJob = new cronJob(job.cron, function(){
		    job.switches.forEach(function(switchEntry) {
		    	self.switches.send({
		    		body: 'Schedule sets ' + switchEntry.groupNumber + ',' + 
		    			switchEntry.switchNumber + ' to state ' + switchEntry.state, 
		    		g:switchEntry.groupNumber,
		    		s:switchEntry.switchNumber, 
		    		st:switchEntry.state,
		    		user:'Schedule'
		    	});
		    });
		}, null, true);
		self.jobs.push(newJob);
	});
};
