var url = "";
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    url = tabs[0].url.split('#')[0];
    chrome.tabs.sendMessage(tabs[0].id, {action: "GET_SONG_INFO"}, function(response) {
      document.querySelector('#endMinute').value = response.endMinute;
      document.querySelector('#endSecond').value = response.endSecond;
      document.querySelector('#title').value = response.title;
    });
});
document.addEventListener('DOMContentLoaded',function(){
  document.querySelector("#add-song").addEventListener('click', function(event){

    let startMinute = document.querySelector('#startMinute').value;
    let startSecond = document.querySelector('#startSecond').value;
    let endMinute = document.querySelector('#endMinute').value;
    let endSecond = document.querySelector('#endSecond').value;
    let title = document.querySelector('#title').value;
    let startTime = parseInt(startMinute) * 60 + parseInt(startSecond);
    let endTime = parseInt(endMinute) * 60 + parseInt(endSecond);

    chrome.extension.sendMessage({
      action: "DOWNLOAD_FILE",
      url: url,
      startTime: startTime,
      endTime: endTime,
      title: title
    });
  });
});
