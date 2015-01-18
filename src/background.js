function startExtension(idTable, changeInfo, tab) {
	chrome.pageAction.show(idTable);
}
chrome.tabs.onUpdated.addListener(startExtension);

// Listeners
chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse)
	{
		switch (request.name)
		{
		case "getIP":
			var currentURL = sender.tab.url;
			if (currentIPList[currentURL] !== undefined) {
				sendResponse({
					domainToIP: currentIPList[currentURL]
				});
			} else {
				sendResponse({
					domainToIP: null
				});
			}
		case "setFlag":
			if (request.flag !== "") {
				chrome.pageAction.setTitle({ 
					tabId: sender.tab.id,
      				title: currentIPList[sender.tab.url]
      			});
      			chrome.pageAction.setIcon({ 
      				tabId: sender.tab.id,
          			path: "images/iconFlags/24/" + request.flag + ".png"
          		});
      		}
			
		break;
			default:
			sendResponse({});
		}
	}
);

// get IP using webRequest
var currentIPList	= {};
chrome.webRequest.onCompleted.addListener(
  function(info) {
	  currentIPList[ info.url ] = info.ip;
	return;
  },
  {
	urls: [],
	types: []
  },
  []
);