//NOT USED
chrome.browserAction.onClicked.addListener(function(activeTab){
  var newURL = chrome.extension.getURL("src/homepage/index.html");
  chrome.tabs.create({ url: newURL });
});

var UserManager = require("../user_management/user_manager.js");
