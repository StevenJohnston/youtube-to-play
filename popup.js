var url = "";
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    url = tabs[0].url;
});
document.addEventListener('DOMContentLoaded',function(){
  document.querySelector("#add-song").addEventListener('click', function(event){
    var xhr = new XMLHttpRequest();
    var post = "video="+url;
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var parser = new DOMParser();

        var doc = parser.parseFromString(xhr.responseText, "text/html");
        var href = doc.querySelector('#downloadButton').getAttribute("href");
        var name = doc.querySelector('.buttonTitle').innerHTML;
        console.log(name);
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
    xhr.open("POST", "http://www.youtubeinmp3.com/widget/button/?video=" + url, true);
    xhr.send(post);
  });
});
