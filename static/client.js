var Client = function() {
	var that = this;
	document.querySelector('#adHocSwitchOn').addEventListener('click', function() {
		var group = document.querySelector('#adHocSwitchGroup').value;
		var swtch = document.querySelector('#adHocSwitchSwitch').value;
		that.doSwitch(group, swtch, 1);
	});
	
	document.querySelector('#adHocSwitchOff').addEventListener('click', function() {
		var group = document.querySelector('#adHocSwitchGroup').value;
		var swtch = document.querySelector('#adHocSwitchSwitch').value;
		that.doSwitch(group, swtch, 0);
	});
};

Client.prototype.doSwitch = function(g,s,state) {
	var ajax = new XMLHttpRequest();
	ajax.onload = function() {
	
	};
	ajax.open('post', 'switch',true);
	ajax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	ajax.send('g=' + g + '&s=' + s + '&st=' + state);
}

var client = new Client();