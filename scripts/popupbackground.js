(async () => {
  try {
    connect();
  } catch (error) {
    setTimeout(() => {
      connect();
    }, 3000)
  }
})();

async function connect() {
  const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
  const response = await chrome.tabs.sendMessage(tab.id, {requestType: "darkPatterns"});

  var listDiv = document.getElementById("foundBox");

  //add paragraph for each found dark pattern
  for (darkPattern of response.darkPatternsList) {
    var p = document.createElement("p");
    p.innerHTML = darkPattern;
    listDiv.appendChild(p);
  }
}
restoreOptions();

setTimeout(() => {
  loaded();
  
}, 100)

function loaded(){
  var ex1 = document.getElementById('patternsSettings').getElementsByTagName('input');
  for(let el of ex1) {
    el.onclick = () => {
      el.checked = true;
      saveOptions();
      }
  }
}

function restoreOptions() {
  chrome.storage.local.get(
    ["trickyQuestions", "misdirection", "privacyZuckering"]
  , function(items) {
    console.log(items);
    if(items.misdirection)document.querySelector('input[name="trickyQuestions"][value="' + items.trickyQuestions + '"]').checked = true;
    if(items.misdirection)document.querySelector('input[name="misdirection"][value="' + items.misdirection + '"]').checked = true;
    if(items.privacyZuckering)document.querySelector('input[name="privacyZuckering"][value="' + items.privacyZuckering + '"]').checked = true;
  });
}

function saveOptions() {
  chrome.storage.local.set({
    "trickyQuestions": document.querySelector('input[name="trickyQuestions"]:checked').value,
    "misdirection": document.querySelector('input[name="misdirection"]:checked').value,
    "privacyZuckering": document.querySelector('input[name="privacyZuckering"]:checked').value
  });
}