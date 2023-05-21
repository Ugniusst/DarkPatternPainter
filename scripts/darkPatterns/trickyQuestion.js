function findTrickyQuestions(body) {
    var labels = getInputLabels(body);
    labels.forEach(label => {
        if(checkIsTrickQuesiton(label)) {
            foundPatterns.push("Tricky Questions found");
            darkPatternsNumber++;
        }

    });
}

function checkIsTrickQuesiton(label) {
    console.log(checkKeywords(label));
    return false;
}

function getInputLabels(body) {
    var inputs = body.getElementsByTagName("input");    
    const labels = [];
    $.map(inputs, function(x) {
        var label = body.querySelector(`label[for="${x.id}"]`);
        if(label && label.getAttribute("for") == x.id) {
            labels.push(label.innerText);
        }
    });
    return labels
}

function removePunctuation(str) {
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
}

function checkKeywords(label) {
    const keywords = [
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
      ];
      var keywordsFound = 0;
      keywords.forEach(keyword => {
          if(label.includes(keyword)) {
              keywordsFound++;
          }
      });

      return keywordsFound;
}