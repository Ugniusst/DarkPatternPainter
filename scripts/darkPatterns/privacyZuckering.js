const STYLE = document.createElement('style');
STYLE.innerHTML = `.closePZ {
    color: #eb5e34;
    float: right;
    font-size: 1em;
    margin-top: -1em;
  }

  .closePZ > em {
    font-weight: bold;
    color: #000;
  }
  
  .closePZ:hover,
  .closePZ:focus,
  em:hover {
    color: gray;
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
        closebtn.innerHTML = "<button>" + closebtn.innerHTML + "</button>";
        closebtn.onclick = (e) => {
            var modal = e.srcElement.parentElement.parentElement;
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
                            foundPatterns.push("<b>Privacy Zuckering</b> found in modal containing: </br>" + divs[i].innerText.slice(0,45) +"...");
                            divs[i].innerHTML = `<span class='closePZ'>--Privacy Zuckering--</span>` + divs[i].innerHTML;
                            // divs[i].setAttribute("style", "border: 2px solid red;");
                            break;
                        }
                    }
                }
            }
            
        }
    }
}