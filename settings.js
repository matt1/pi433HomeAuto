/**
*	Settings for home automation
*/

/**
 * Command to use for sending switch controls.  Update to reflect your path
 */
exports.rcswitch = 'sudo /home/pi/projects/rcswitch-pi/sendTriState';

/** Hostname for root of application - no trailing slash!.  Used by Google authentication so make
 * sure that it will be reachable from all users (i.e. http://localhost probably wont work for other 
 * users who are not running nodejs locally!). */
exports.host = 'https://example.com';

/** Port number used by app.  Used to listen on correct port etc */
exports.port = 8080;

/** Port number to be used during Google auth - if you are exposing node directly to the internet
 * use the same port number as above (e.g. 8080).  If you are running behind a reverse proxy then
 * use the port configured there.  E.g. if running a HTTPS reverse proxy, you'd use 443.
 */
exports.authPort = 443;
	
/** Users allowed access to the app */
exports.users =  ['...gmail.com'];

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
	},
	{
		name:'Hall way',
		groupNumber: 4,
		switchNumber: 3
	},
	{
		name:'Bed room',
		groupNumber: 4,
		switchNumber: 4
	}
];

/** The schedule for turning switches on and off. Order is not important as they will be loaded
 * at start-up and then processed appropriately.  cronmaker.com can help with the cron codes.
 */
var d = new Date();
exports.schedule = [
    {
        name: 'Hallway on',
        cron: '0 45 17 * * *',
        switches: [
          {
            groupNumber:4,
            switchNumber:3,
            state:1
          }
        ]
    },
    {
        name: 'Hallway off',
        cron: '0 30 22 * * *',
        switches: [
          {
            groupNumber:4,
            switchNumber:3,
            state:0
          }
        ]
    },
    {
        name: 'Livingroom on',
        cron: '0 2 19 * * * ',
        switches: [
          {
            groupNumber:4,
            switchNumber:1,
            state:1
          }
        ]
    },
    {
        name: 'Livingroom off',
        cron: '0 11 21 * * * ',
        switches: [
          {
            groupNumber:4,
            switchNumber:1,
            state:0
          }
        ]
    },
    {
        name: 'Backroom on',
        cron: '0 9 21 * * 0,4',
        switches: [
          {
            groupNumber:4,
            switchNumber:2,
            state:1
          }
        ]
    },
    {
        name: 'Backroom off',
        cron: '0 56 21 * * *',
        switches: [
          {
            groupNumber:4,
            switchNumber:2,
            state:0
          }
        ]
    },
    {
        name: 'Bedroom on',
        cron: '0 0 21 * * *',
        switches: [
          {
            groupNumber:4,
            switchNumber:4,
            state:1
          }
        ]
    },
    {
        name: 'Bedrrom off',
        cron: '0 45 22 * * *',
    	switches: [
          {
            groupNumber:4,
            switchNumber:4,
            state:0
          }
        ]
    }
];
