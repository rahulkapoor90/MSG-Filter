function onMessage(request, sender, sendResponse) {
  if (request.method == "saveStats") { 
    console.log("Storing stats...");
    console.log ("Adding " + request.krk + " KRK to stats.");
    chrome.storage.sync.get({
      krk: 0,
      pages: 0
    }, function(items) {
      chrome.storage.sync.set({
        krk: items.krk + request.krk,
        pages: items.pages + 1
      });
    });
    sendResponse({});
  } else {
    // Show icon
    console.log("Putting badge on address bar.");
    chrome.pageAction.show(sender.tab.id);

    // Log event with Google Analytics
    console.log("Logging Filter event...");
    chrome.storage.sync.get({
      filter: 'aggro'
    }, function(items) {
      ga('send', 'event', 'Filter', 'KRK', items.filter);
    });
    sendResponse({});
  }
}

chrome.runtime.onMessage.addListener(onMessage);
