/**
*	Settings for home automation
*/

/** Hostname for root of application - no trailing slash!.  Used by Google authentication */
exports.host = 'http://raspberrypi';

/** Port number used by app.  Used to listen on correct port etc */
exports.port = 8080;
	
/** Users allowed access to the app */
exports.users =  ['your.account@gmail.com'];

/** Your switches! */	
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