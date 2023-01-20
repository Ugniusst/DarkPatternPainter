(async () => {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, {requestType: "darkPatterns"});

  var listDiv = document.getElementById("foundBox");

  //add paragraph for each found dark pattern
  for (darkPattern of response.darkPatternsList) {
    var p = document.createElement("p");
    p.innerText = darkPattern;
    listDiv.appendChild(p);
  }

})();