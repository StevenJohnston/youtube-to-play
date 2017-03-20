var url = "";
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    url = tabs[0].url;
});
document.addEventListener('DOMContentLoaded',function(){
  document.querySelector("#add-song").addEventListener('click', function(event){
    chrome.extension.sendMessage({
      action: "downloadFile",
      'url': url,
    });
  });
  document.querySelector("#setup-play").addEventListener('click', function(event){
    chrome.extension.sendMessage({
      action: "setupPlay",
      'url': url,
    });
  });
});
