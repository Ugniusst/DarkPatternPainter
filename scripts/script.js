
var foundPatterns = [];
var darkPatternsNumber = 0;

const darkPatternsOptions = {
    trickyQuestions: 1,
    misdirection: 1,
    privacyZuckering: 1,
}
//listen for popup open action and then send found dark patterns
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.requestType === "darkPatterns")
        sendResponse({darkPatternsList: foundPatterns});
    }
  );

  function getOptions() {
    chrome.storage.local.get(
      ["trickyQuestions", "misdirection", "privacyZuckering"]
    , function(items) {
      darkPatternsOptions.trickyQuestions = items.trickyQuestions;
      darkPatternsOptions.misdirection = items.misdirection;
      darkPatternsOptions.privacyZuckering = items.privacyZuckering;
    });
}

getOptions();
setTimeout(() => {
    console.log(darkPatternsOptions.privacyZuckering);
    if(darkPatternsOptions.misdirection == 1)
        findInconsistenButtons(document.body);
    else if(darkPatternsOptions.misdirection == 2)
        modifyButtonStyles(document.body);

    if(darkPatternsOptions.trickyQuestions == 1)
        findTrickyQuestions(document.body);
    else if(darkPatternsOptions.trickyQuestions == 2)
        modifyTrickyQuestions(document.body);
    
    if(darkPatternsOptions.privacyZuckering == 1)
        findPrivacyZuckering(document.body);
    else if(darkPatternsOptions.privacyZuckering == 2)
        modifyPrivacyZuckering(document.body);

  }, 5000)

