/**
*	Settings for home automation
*/

/** Hostname for root of application - no trailing slash!.  Used by Google authentication */
exports.host = 'http://localhost';

/** Port number used by app.  Used to listen on correct port etc */
exports.port = 8080;
	
/** Users allowed access to the app */
exports.users =  ['matt.dibb@gmail.com'];

/** Your switches! These will appear with simple on-off links in the UI for direct control */	
exports.switches = [
	{
		name:'Living room',
		groupNumber: 4,
		switchNumber: 1
	},
	{
		name:'Back room',
		groupNumber: 4,
		switchNumber: 2
	}
];

/** The schedule for turning switches on and off. Order is not important as they will be loaded
 * at start-up and then processed appropriately.  cronmaker.com can help with the cron codes.
 * 
 * groupNumber 1-4
 * switchNumber 1-4, also can use 0 for all switches in the group.
 * 
 * Example to turn on two lights (4,1 and 4,2) every dat at 6:15pm:
 * 
 *  {
 *  name: 'Daily Switch on (18:15)',
 *  cron: '0 15 18 * * *',
 *  switches: [{
 *      groupNumber:4,
 *      switchNumber:1,
 *      state: 1
 *    },
 *    {
 *        groupNumber:4,
 *        switchNumber:2,
 *        state: 1
 *    }]
 *},
 * 
 * 
 */
exports.schedule = [
  {
	  name: 'Daily switch on (18:30)',
	  cron: '0 30 18 * * * ',
	  switches: [
	    {
	      groupNumber:4,
	      switchNumber:0,
	      state:1
	    }
	  ]
  }
  
];
