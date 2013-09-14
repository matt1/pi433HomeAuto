/**
*	Utils
*/

/**
 * Converts a date to something sensible for the logs.
 * Cant use toISOString as its all UTC.
 */
exports.toLogDateFormat = function(date) {
	function zeros(n) {
		if (n < 10) {
			return '0' + n;
		}
		return n;
	}
	
	var formated = date.getFullYear() + '-' +
			zeros(date.getMonth()) +  '-' + 
			zeros(date.getDay()) + 'T' + 
			zeros(date.getHours()) + ":" +
			zeros(date.getMinutes()) + ":" +
			zeros(date.getSeconds()) + "." +
			date.getMilliseconds();
	
	return formated;
};

/**
 * Logs a message in the standard format.  If caller is not provided then a default will be used.
 * 
 */
exports.log = function(message, caller) {
	var callerName = caller || "UknownModule";
	console.log(callerName +' ' + this.toLogDateFormat(new Date()) + ': ' + message);		
};