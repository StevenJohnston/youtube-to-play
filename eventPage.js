chrome.storage.sync.get('setup',function(setupStorage){
  console.log(setupStorage);
  var setup = setupStorage.setup;
  setup = !!setup;

  chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse)
    {
      switch (request.action) {
        case "downloadFile":
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
                    filename: "playmusic/"+name+".mp3" // Optional
                  },function(){console.log("Downlaoded");});
                }
              }
              xhr2.open("get", "http://www.youtubeinmp3.com" + href, true);
              xhr2.send();
            }
          }
          xhr.open("POST", "http://www.youtubeinmp3.com/widget/button/?video=" + request.url, true);
          xhr.send(post);
          break;
        case "setupPlay":
          if(!setup){
            var newURL = "https://play.google.com/music/listen?u=0#/msp";
            var id = chrome.tabs.create({ url: newURL, active: true }, (tab) => {
              chrome.tabs.executeScript(tab.id, {file:"content.js"}, function() {
                console.log("new tab id");
                console.log(tab.id);
                chrome.tabs.sendMessage(tab.id, {action: "setup", "setup": setup});
              });
            });
          }else{
            var newURL = "https://play.google.com/music/listen";
            var id = chrome.tabs.create({ url: newURL, active: true }, (tab) => {
              chrome.tabs.executeScript(tab.id, {file:"content.js"}, function() {
                console.log("new tab id");
                console.log(tab.id);
                chrome.tabs.sendMessage(tab.id, {action: "onLoad", "setup": setup});
              });
            });
          }
          break;
        default:
      }
    }
  );
})
