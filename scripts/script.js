
var foundPatterns = [];
var darkPatternsNumber = 0;

const darkPatternsOptions = {
    trickyQuestions: 1,
    misdirection: 1,
}
//listen for popup open action and then send found dark patterns
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.requestType === "darkPatterns")
        sendResponse({darkPatternsList: foundPatterns});
    }
  );

  function getOptions() {
    console.log("getOptions");
    chrome.storage.local.get(
      ["trickyQuestions", "misdirection"]
    , function(items) {
      darkPatternsOptions.trickyQuestions = items.trickyQuestions;
      darkPatternsOptions.misdirection = items.misdirection;
    });
}

getOptions();
setTimeout(() => {
    if(darkPatternsOptions.misdirection == 1)
        findInconsistenButtons(document.body);
    else if(darkPatternsOptions.misdirection == 2)
        modifyButtonStyles(document.body);

    if(darkPatternsOptions.trickyQuestions == 1)
        findTrickyQuestions(document.body);
    else if(darkPatternsOptions.trickyQuestions == 2)
        modifyTrickyQuestions(document.body);
    

  }, 1000)

