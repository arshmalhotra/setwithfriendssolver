chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({delay: 10});
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'setwithfriends.com', pathContains: 'game'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
