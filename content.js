chrome.extension.sendMessage({
  action: "getFirstRun"
});
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse){
      switch (request.action) {
        case "firstRunCallback":
          console.log("first run callback");
            console.log(request.firstRun);
          break;
        default:

      }
  }
);
