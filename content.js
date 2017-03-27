var singleAction = 0;
var pageLoaded = false;
var uploadLoaded = false;
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse){
    if(singleAction++ != 0) return;
    switch (request.action) {
      case "upload":
        var observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node){
              var upload = document.querySelector('#nav > div.nav-section.material > a:nth-child(2)');
              if(pageLoaded == false && upload != null){
                pageLoaded = true;
                upload.click();
                //observer.disconnect();
              }
              var uploadDialogContent = document.querySelector('.upload-dialog');
              if(uploadLoaded == false && uploadDialogContent != null)
              {
                uploadLoaded = true;
                let downImageUrl = chrome.extension.getURL("images/down.svg");
                uploadDialogContent.innerHTML +=
                  "<div style='position:fixed; left:30px; bottom: -70px;'>" +
                  '<div style="font-size: 70px;display: block;text-align: center;position:fixed;left:0px;bottom: 0px;color: #ff5722;">Drag it!' +
                  "<img style='height:300px; transform: rotate(245deg) scaleX(-1); display: block;' src='" + downImageUrl + "'></div></div>";
                observer.disconnect();
              }
            });
          })
        });
        observer.observe(document.querySelector("body"), {
          childList: true
          , subtree: true
          , attributes: true
          , characterData: false
        });
        break;

    }
  }
);
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.action) {
      case "GET_SONG_INFO":
        var endTime = document.querySelector('.ytp-bound-time-right').innerHTML.split(':');
        var title = document.querySelector('title').textContent.replace(' - YouTube','');
        sendResponse({
          'endMinute': endTime[0],
          'endSecond': endTime[1],
          'title': title
        });
        break;
      default:

    }
  });
