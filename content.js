var a = 0;
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse){
    if(a++ != 0) return;
      switch (request.action) {
        case "onLoad":
        console.log("onLoad");
        console.log(request);
          if(request.firstRun){
            document.querySelector("#left-nav-open-button").click();
            console.log("firstload");
            console.log(document.querySelector("#left-nav-open-button"));
          }
        break;
        case "firstRunCallback":

            console.log("first run callback");
            console.log(sender.tab);
            console.log(request.firstRun);
          break;
        default:

      }
  }
);

var b = 0;
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation);
    if(b++ != 0) return;
    if(mutation.type="attributes"){
      if(mutation.target.attributes["data-type"].value == "full-loading-overlay"){
        //document.querySelector("#left-nav-open-button").click();
        document.querySelector("#nav > div.nav-section.material > a:nth-child(3)").click();
        document.querySelector("#upload > div.settings-music-source-list-container > div > div.music-source-list-container > div.music-source-actions-wrapper > div > paper-button.music-source-change-locations-button.material-primary.x-scope.paper-button-1").click();
      }
    }
  })
})
observer.observe(document.querySelector("#loading-overlay"), {
    childList: true
  , subtree: true
  , attributes: true
  , characterData: false
});

// stop watching using:
//observer.disconnect()
