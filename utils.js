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
} 