chrome.tabs.onUpdated.addListener(updated);
chrome.tabs.onActivated.addListener(updated);
function updated(){
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      if(tabs[0].url.includes("https://www.youtube.com/watch?v")){
        chrome.browserAction.setIcon({path: 'icon.png'});
      }else {
        chrome.browserAction.setIcon({path: 'icon_disabled.png'});
      }
  });
}

chrome.storage.sync.get('setup',function(setupStorage){
  var setup = setupStorage.setup;
  setup = !!setup;

  chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse)
    {
      switch (request.action) {
        case "DOWNLOAD_FILE":
          var xhr = new XMLHttpRequest();
          var post = "video="+request.url;
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              var parser = new DOMParser();

              var doc = parser.parseFromString(xhr.responseText, "text/html");
              var href = doc.querySelector('#downloadButton').getAttribute("href");
              var name = doc.querySelector('.buttonTitle').innerHTML;
              var xhr2 = new XMLHttpRequest();
              xhr2.onreadystatechange = function() {
                if (xhr2.readyState == 4) {
                  chrome.downloads.download({
                    url: xhr2.responseURL,
                    filename: "playmusic/"+title+".mp3" // Optional
                  },function(){
                    var newURL = "https://play.google.com/music/listen";
                    var id = chrome.tabs.create({ url: newURL, active: true }, (tab) => {
                      chrome.tabs.executeScript(tab.id, {file:"content.js"}, function() {
                        chrome.tabs.sendMessage(tab.id, {action: "upload"});
                      });
                    });
                  });
                }
              }
              xhr2.open("get", "http://www.youtubeinmp3.com" + href, true);
              xhr2.send();
            }
          }
          var start = request.startTime;
          var end = request.endTime;
          var title = request.title;
          var getButton = "http://www.youtubeinmp3.com/en/widget/button/?video=" + request.url;
          if(end)
          {
            getButton += '&start=' + start;
            getButton += '&end=' + end;
          }
          if(title)
          {
            getButton += '&title=' + title;
          }
          xhr.open("GET", getButton, true);
          xhr.send();
          break;
        default:
      }
    }
  );
})
