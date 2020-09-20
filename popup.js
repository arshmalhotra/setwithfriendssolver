function loadScriptToTab(script) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      script
    );
  });
}

window.onload = function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'sethack.js'}
    );
  });
};

let clickSet = document.getElementById('clickSet');
let runLoop = document.getElementById('run');


clickSet.onclick = function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'clickCards();'}
    );
  });
};

runLoop.onclick = function() {
  let runLength = parseInt(document.getElementById('runLength').value);
  if (runLength >= 0) {
    runLength *= 1000;
  } else {
    runLength = 10000;
  }
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: 'run(' + runLength + ');'}
    );
  });
};
