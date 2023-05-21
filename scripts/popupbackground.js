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
    p.innerText = darkPattern;
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
  console.log("restoreOptions");
  chrome.storage.local.get(
    ["trickyQuestions", "misdirection"]
  , function(items) {
    if(items.misdirection)document.querySelector('input[name="trickyQuestions"][value="' + items.trickyQuestions + '"]').checked = true;
    if(items.misdirection)document.querySelector('input[name="misdirection"][value="' + items.misdirection + '"]').checked = true;
  });
}

function saveOptions() {
  chrome.storage.local.set({
    "trickyQuestions": document.querySelector('input[name="trickyQuestions"]:checked').value,
    "misdirection": document.querySelector('input[name="misdirection"]:checked').value,
  });
  console.log(document.querySelector('input[name="misdirection"]:checked').value);
}