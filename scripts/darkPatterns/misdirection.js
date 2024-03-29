const STYLEMISD = document.createElement('style');
STYLEMISD.innerHTML = `.borderDP {
    border: 3px solid red;
  }`;

document.getElementsByTagName('head')[0].appendChild(STYLEMISD);

const GOODCOOKIESKEYWORDS = ["essential", "necessar", "only", "more", "daugiau", "būtin"];
var GoodCokiesButtonsList = [];
var GoodCokiesButtonsKeywords = [];
var buttonsList = [[]];


function findInconsistenButtons(body) {
    var divs = body.getElementsByTagName("div");
    //check all divs
    for (let div of divs) {
        //if div doesnt have child "div" nodes, then search for buttons
        if(div.getElementsByTagName("div").length == 0) {
            var buttons = div.getElementsByTagName("button");
            buttons = div.querySelectorAll('button,a')
            if(buttons.length > 1) {
                var lastButtonStyle = getComputedStyle(buttons[buttons.length - 1]);
                for (button of buttons) {
                    var buttonStyle = getComputedStyle(button);
                    var colorDifference = deltaE(lastButtonStyle['background-color'], buttonStyle['background-color']);
                    if(colorDifference > 50) {
                        foundPatterns.push("<b>Misdirection</b> found in buttons containing: </br>" + button.innerText);
                        var isGoodCookie = false;
                        GOODCOOKIESKEYWORDS.forEach(keyword => {
                            if(div.innerText.toLowerCase().includes(keyword)) {
                                GoodCokiesButtonsKeywords.push(keyword);
                                GoodCokiesButtonsList.push(buttons);
                                isGoodCookie = true;
                            }
                        });
                        if(!isGoodCookie) {
                            buttonsList.push(buttons);
                        }
                        break;
                    }
                }
            }
        }
    }
}
function modifyButtonStyles(body) {
    findInconsistenButtons(body);
    for (var goodCookieButtons of GoodCokiesButtonsList) {
        var goodCookieStyle;
        var badCookieStyle;
        for(var goodCookieButton of goodCookieButtons) {
            var isGoodCookie = false;
            GOODCOOKIESKEYWORDS.forEach(keyword => {
                if(goodCookieButton.innerText.toLowerCase().includes(keyword)) {
                    goodCookieStyle = getComputedStyle(goodCookieButton);
                    console.log(goodCookieButton);
                    isGoodCookie = true;
                }
            });
            if(!isGoodCookie) {
                console.log(goodCookieButton);
                badCookieStyle = getComputedStyle(goodCookieButton);
            }
        }
        for(var goodCookieButton of goodCookieButtons) {
            Array.from(goodCookieStyle).forEach(key => 
                goodCookieButton.style.setProperty(key, goodCookieStyle.getPropertyValue(key), goodCookieStyle.getPropertyPriority(key)))
            GOODCOOKIESKEYWORDS.forEach(keyword => {
                if(goodCookieButton.innerText.toLowerCase().includes(keyword)) {
                    Array.from(badCookieStyle).forEach(key => 
                        goodCookieButton.style.setProperty(key, goodCookieStyle.getPropertyValue(key), goodCookieStyle.getPropertyPriority(key)))
                   
                }
            });
        }
    }
    for (buttons of buttonsList) {
        //if one or more buttons exist there, change their style to last button's class.
        if(buttons.length > 1) {
            lastIndex = buttons.length - 1;
            latestClass = buttons[lastIndex].className;
            const computedStyle = getComputedStyle(buttons[lastIndex]);
          
            for (let button of buttons) {
                Array.from(computedStyle).forEach(key => 
                    button.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key)))
            }
            
        }
    }   

}

//code from https://stackoverflow.com/a/52453462
function deltaE(rgbA1, rgbB1) {
    let rgbA = rgbA1.slice(
        rgbA1.indexOf("(") + 1, 
        rgbA1.indexOf(")")
    ).split(", ");
    let rgbB = rgbB1.slice(
        rgbB1.indexOf("(") + 1, 
        rgbB1.indexOf(")")
    ).split(", ");
    let labA = rgb2lab(rgbA);
    let labB = rgb2lab(rgbB);
    let deltaL = labA[0] - labB[0];
    let deltaA = labA[1] - labB[1];
    let deltaB = labA[2] - labB[2];
    let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
    let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
    let deltaC = c1 - c2;
    let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
    let sc = 1.0 + 0.045 * c1;
    let sh = 1.0 + 0.015 * c1;
    let deltaLKlsl = deltaL / (1.0);
    let deltaCkcsc = deltaC / (sc);
    let deltaHkhsh = deltaH / (sh);
    let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
    return i < 0 ? 0 : Math.sqrt(i);
  }
  
  function rgb2lab(rgb){
    
    let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
    x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
    y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
    z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
  }