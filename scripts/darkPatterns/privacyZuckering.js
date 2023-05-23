const STYLE = document.createElement('style');
STYLE.innerHTML = `.closePZ {
    color: #000;
    float: right;
    font-size: 16px;
    font-weight: bold;
    margin-top: -1em;
  }
  
  .closePZ:hover,
  .closePZ:focus {
    color: black;
    text-decoration: none;
  }`;

document.getElementsByTagName('head')[0].appendChild(STYLE);

function findPrivacyZuckering(body) {
    findPrivacyZuckeringModal(body);
}

function modifyPrivacyZuckering(body) {
    findPrivacyZuckeringModal(body);
    var closebtns = body.getElementsByClassName("closePZ");

    for(closebtn of closebtns) {
        closebtn.innerHTML = closebtn.innerHTML + " - <em>Close</em>";
        closebtn.onclick = (e) => {
            var modal = e.srcElement.parentElement;
            modal.setAttribute("style", "display:none");
        }
    }
}



function findPrivacyZuckeringModal(body) {
    const KEYWORDSACTIONS = [
        'upload',
        'share',
        'sync',
        'add',
        'invite'
    ];
    const KEYWORDSOBJECTS = [
        'location',
        'contacts',
        'friends',
        'personal',
        'photos',
        'history'
    ];
    var divs = body.getElementsByTagName("div");
    for(i = divs.length - 1; i >= 0; i--) {
        if(divs[i].outerHTML.includes("modal")){
            var modal = divs[i];
            for (action of KEYWORDSACTIONS) {
                if(modal.outerHTML.includes(action)) {
                    for(object of KEYWORDSOBJECTS) {
                        if(modal.outerHTML.includes(object) && !(modal.innerText.includes("NO") || modal.innerText.includes("Close")))  {
                            divs[i].innerHTML = `<button class='closePZ'>Privacy Zuckering</button>` + divs[i].innerHTML;
                            foundPatterns.push("Privacy Zuckering");
                            break;
                        }
                    }
                }
            }
            
        }
    }
}