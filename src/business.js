$(document).ready(function() {
	$.ajax({ 
  		url: 'https://freegeoip.net/json/', 
  		type: 'GET', 
  	})
  		.done(function (data) {
			var nameImage = 'images/iconFlags/24/' + data.country_code.toLowerCase() + ".png";
			var imgString = '<img id="flag24" src="' + chrome.extension.getURL(nameImage) + '"/>';
			$("body").append('<div id="externalIP"><div id="ipdata">' + data.ip + "</div>" + imgString + '</div>');
			$('body').on('click', '#externalIP', function() {
				$(this).hide();
			});
		});
	chrome.extension.sendMessage({name: "getIP"}, function(response) {
		var finalIP = response.domainToIP;
		getFlag(finalIP,function(flag){
			chrome.extension.sendMessage({name: "setFlag", flag: flag}, function(response) {
				
			});
		});
		
	});		
	
  	
});

// get Flag 
function getFlag(webIP,callback) {
	var flag = "";
	var url = 'https://freegeoip.net/json/' + webIP;
	$.ajax({ 
  		url: url, 
  		type: 'GET', 
  	})
  	.done(function (data) {
		callback(data.country_code.toLowerCase());
	});
};


