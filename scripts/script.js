setTimeout(() => {
    findInconsistenButtons(document.body);
  }, 3000)



function findInconsistenButtons(body) {
    var divs = body.getElementsByTagName("div");
    for (let div of divs) {
        if(div.getElementsByTagName("div").length == 0) {
            var buttons = div.getElementsByTagName("button");
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
            }
        }
    }
}