let clickSet = document.getElementById('clickSet');
let runLength = document.getElementById('runLength');
let runLoop = document.getElementById('run');


clickSet.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'sethack.js'},
      function(result) {
        tabs[0].id,
        {code: 'clickCards();'}
      }
    );
  });
}
