//scores and words database

const SCORES = {
    LongSentence: 2,
    PatternWords: 2.5,
    Punctuation: 0.5,
    Keywords: 1.5,
    DoubleNegotion: 3.5,
  };

  const KEYWORDS = [
    'box',
    'tick',
    'uncheck',
    'receive',
    'email',
    'newsletter',
    'checkbox',
    'please',
    'discount',
    'benefit',
    'offer',
    'promotion',
    'receive',
    'special',
    'unsubscribe',
    'opt-out',
    'opt-in',
    'all of the above',
  ];

    const WORDS = ['if you', "don't", 'do not'];

    const firstNegativeNegotions = ["don't","do not", "not","uncheck", "untick", "unselect", "unclick"];
    const secondNegativeNegotions = ["opt-in", "subscribe", "agree", "want", "receive", "consent", "accept", "wish", "send"];

    const firstPositiveNegotions = ["do", "check", "tick", "select", "click"];
    const secondPositiveNegotions = ["opt-out", "unsubscribe", "disagree"];

//functions to find dark patterns
function findTrickyQuestions(body) {
    var [labels, inputs] = getInputLabels(body);
    labels.forEach(label => {
        if(checkIsTrickQuesiton(label.innerText)) {
            foundPatterns.push("Tricky Questions found");
            darkPatternsNumber++;
            markTrickQuestion(label);
        }
    });
}

function modifyTrickyQuestions(body) {
    var replacableWords = KEYWORDS.concat(WORDS, firstNegativeNegotions, secondNegativeNegotions, firstPositiveNegotions, secondPositiveNegotions);
    var [labels, inputs] = getInputLabels(body);
    labels.forEach(label => {
        if(checkIsTrickQuesiton(label.innerText)) {
            //modifyDoubleNegotionsCheckboxes(label.innerText, inputs[labels.indexOf(label)]);
            foundPatterns.push("Tricky Questions found");
            darkPatternsNumber++;
            markTrickQuestion(label);
            replacableWords.forEach(word => {
                if(label.innerHTML.includes("<input")) {
                    var input = label.innerHTML.substring(label.innerHTML.indexOf('>') + 1);
                    label.innerHTML = label.innerHTML.split(">")[0] + ">" + input.replace(word, "<b>" + word + "</b>");
                }
                else label.innerHTML = label.innerHTML.replace(word, "<b>" + word + "</b>");
            });
        }
    });
}

function markTrickQuestion(label) {

    if(label.innerHTML.includes("<input"))
    {
        var input = label.innerHTML.substring(label.innerHTML.indexOf('>') + 1);
        label.innerHTML = label.innerHTML.split(">")[0] + ">" + "<em> [Tricky Question]  </em>" + input;
    }
}

function checkIsTrickQuesiton(label) {
    var score = 0;
    checkKeywords(label) >= 3 ? score += SCORES.Keywords : score += 0;
    checkPunctuation(label) ? score += SCORES.Punctuation : score += 0;
    checkPatternWords(label) ? score += SCORES.PatternWords : score += 0;
    countWords(label) > 11 ? score += SCORES.LongSentence : score += 0;
    checkForDoubleNegotion(label) > 0 ? score += SCORES.DoubleNegotion : score += 0;

    var totalScores = 0;
    Object.values(SCORES).forEach((_score) => {
        totalScores += _score;
      });  
    return (score / totalScores) > 0.65;
    return false;
}

function getInputLabels(body) {
    var inputs = body.getElementsByTagName("input");    
    const labels = [], _inputs = [];
    $.map(inputs, function(x) {
        if(x.type == "checkbox" || x.type == "radio"){
            var label = body.querySelector(`label[for="${x.id}"]`);
            if(label && label.getAttribute("for") == x.id) {
                labels.push(label);
                _inputs.push(x);
            }
        }
    });
    return [labels, _inputs];
}

function checkPunctuation(label) {
    label = label.slice(0, -1);
    const punctuations = [".", ",", "!", "?"];
    for (punct of punctuations) {
        if(label.includes(punct)) {
            return true;
        }
    } 
}

function checkKeywords(label) {
   
      var keywordsFound = 0;
      KEYWORDS.forEach(keyword => {
          if(label.includes(keyword)) {
              keywordsFound++;
          }
      });

      return keywordsFound;
}

function checkPatternWords(label) {
    var wordsFound = 0;
    WORDS.forEach(word => {
        if(label.includes(word)) {
            wordsFound++;
        }
    });

    return wordsFound > 0;
}

function countWords(label) {
    return label.split(" ").length;
}

function checkForDoubleNegotion(label) {
    var sentences = label.split(".");
    var NegotionsFound = 0;

    for(sentence of sentences) {
        for(firstNegotion of firstNegativeNegotions) {
            for(secondNegotion of secondNegativeNegotions) {
                if(sentence.includes(firstNegotion) && sentence.includes(secondNegotion)) {
                    NegotionsFound++;
                }
            }
        }
        for(firstNegotion of firstPositiveNegotions) {
            for(secondNegotion of secondPositiveNegotions) {
                if(sentence.includes(firstNegotion) && sentence.includes(secondNegotion)) {
                    NegotionsFound++;
                }
            }
        }
    }
    return NegotionsFound;

}

function modifyDoubleNegotionsCheckboxes(label, input) {
    var sentences = label.split(".");
    var NegotionsFound = 0;
    for(sentence of sentences) {
        for(firstNegotion of firstNegativeNegotions) {
            for(secondNegotion of secondNegativeNegotions) {
                if(sentence.includes(firstNegotion) && sentence.includes(secondNegotion)) {
                    NegotionsFound++;
                    input.checked = false;
                    return;
                }
            }
        }
        for(firstNegotion of firstPositiveNegotions) {
            for(secondNegotion of secondPositiveNegotions) {
                if(sentence.includes(firstNegotion) && sentence.includes(secondNegotion)) {
                    NegotionsFound++;
                    console.log(input);
                    input.setAttribute("checked", true);
                    return;
                }
            }
        }
    }
    return NegotionsFound;

}