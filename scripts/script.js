var foundPatterns = [];
var darkPatternsNumber = 0;

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

setTimeout(() => {
    findInconsistenButtons(document.body);
  }, 1000)



function findInconsistenButtons(body) {
    var divs = body.getElementsByTagName("div");
    //check all divs
    for (let div of divs) {
        //if div doesnt have child "div" nodes, then search for buttons
        if(div.getElementsByTagName("div").length == 0) {
           found = modifyButtonStyles(div);
        }
    }
}

function modifyButtonStyles(div) {
    var buttons = div.getElementsByTagName("button");
    //if one or more buttons exist there, change their style to last button's class.
    if(buttons.length > 1) {
        lastIndex = buttons.length - 1;
        latestClass = buttons[lastIndex].className;
        if(buttons[lastIndex].hasAttribute("mode")) {
            latestMode = buttons[lastIndex].getAttribute("mode");
        }
        console.log(latestClass);
        for (let button of buttons) {
            button.className = latestClass;
            if(button.hasAttribute("mode")) {
                button.setAttribute("mode", latestMode);
            }
        }
        
        foundPatterns[darkPatternsNumber] = "Misdirection found in buttons"
        darkPatternsNumber++;
        return true;
    }
    else return false;

}