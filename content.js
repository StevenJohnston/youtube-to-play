var a = 0;
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse){
    if(a++ != 0) return;
    switch (request.action) {
      case "setup":
      var pageLoaded = false;
      var clickAddAFolder = false;

      var observer = new MutationObserver(function(mutations) {

        mutations.forEach(function(mutation) {
          mutation.addedNodes.forEach(function(node){
            var radio = document.querySelector('#select-add-music-specific-folders');
            var addAFolder = document.querySelector("#music-content > div.g-content.view-transition > div > div.content-wrapper > div.add-music-content > div.music-sources > div > div.music-source-list-container > div.music-source-actions-wrapper > div > paper-button.music-source-change-locations-button.material-primary.x-scope.paper-button-1");
            if(pageLoaded == false && radio != null){
              pageLoaded = true;
              radio.click();
              setTimeout(function(){
                document.querySelector('#music-content > div.g-content.view-transition > div > div.content-wrapper > div.buttons > paper-button.material-primary.add-music-folders.x-scope.paper-button-1').click();
              });
            }else if (pageLoaded == false && document.querySelector("#music-content > div.g-content.view-transition > div > div.content-wrapper > div.add-music-content > div.music-sources > div > div.music-source-list-container > div.music-source-actions-wrapper > div > paper-button.music-source-change-locations-button.material-primary.x-scope.paper-button-1") != null) {
              document.querySelector("#music-content > div.g-content.view-transition > div > div.content-wrapper > div.add-music-content > div.music-sources > div > div.music-source-list-container > div.music-source-actions-wrapper > div > paper-button.music-source-change-locations-button.material-primary.x-scope.paper-button-1").click();
              pageLoaded = true;
            }
            else if (clickAddAFolder == false && addAFolder != null) {
              var existingFolders = document.querySelectorAll('.music-source-list-item-name');
              existingFolders.forEach(function(folder){
                if(folder.innerHTML == "playmusic"){
                  chrome.storage.sync.set({'setup': true},function(){
                    console.log("updated storage");
                  });
                  clickAddAFolder = true;
                }
              });
              if(clickAddAFolder == false)
              {
                var main = document.querySelector('#mainPanel');
                main.innerHTML = "";
                main.appendChild(addAFolder);

                addAFolder.style.width="50%";
                addAFolder.style.height="100px";
                addAFolder.style.margin = "0 auto";
                var span = document.createElement('span');
                var downImageUrl = chrome.extension.getURL("images/down.svg");
                var tutImage = chrome.extension.getURL("images/playmusictut.png");
                span.innerHTML = "<div style='width:100%; text-align:center; font-size:40px'>Click ADD A FOLDER below and select /downloads/playmusic</div><div style='width:100%;  text-align:center'><img style='height:300px' src='" + downImageUrl + "'><img  src='" + tutImage + "'></div></div>";
                addAFolder.parentNode.insertBefore(span,addAFolder);

                clickAddAFolder = true;
              }
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
      case "onLoad":
        console.log("onLoad ");
      break;

    }
  }
);
