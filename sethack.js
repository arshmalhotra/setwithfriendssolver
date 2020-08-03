function getClassName(){
  var potentialCards = document.querySelectorAll('div[class^="jss"]');
  var className = "jss"
  for (var i=0; i<potentialCards.length; i++) {
    if (potentialCards[i].classList.length == 2) {
      className = potentialCards[i].className;
      break;
    }
  }
  return className
}

function getData(cards) {
  var cardsDict = {}
  for (var i=0; i<cards.length; i++) {
    var svgs = cards[i].getElementsByTagName("svg")
    var number = svgs.length;
    var uses = svgs[0].getElementsByTagName("use");
    var shape = uses[0].getAttribute("href");
    var fill = uses[0].getAttribute("fill");
    if (fill != "transparent") {
      fill = uses[0].getAttribute("mask");
    }
    var color = uses[1].getAttribute("stroke");
    cardsDict[i] = {
      'number': number,
      'shape': shape,
      'fill': fill,
      'color': color
    }
  }
  return cardsDict
}

function comparisons(a, b, c) {
  var allEqual = (a == b && b == c);
  var allUnequal = (a != b && b != c && a != c);
  return allEqual || allUnequal
}

function findSet(cardsDict) {
  var dictLength = Object.keys(cardsDict).length
  for (var i=0; i<dictLength; i++) {
    var first = cardsDict[i];
    for (var j=i+1; j<dictLength; j++) {
      var second = cardsDict[j];
      for (var k=j+1; k<dictLength; k++) {
        var third = cardsDict[k];
        var set = true;
        if (!comparisons(first['number'], second['number'], third['number'])) {
          set = false;
        }
        if (!comparisons(first['shape'], second['shape'], third['shape'])) {
          set = false;
        }
        if (!comparisons(first['fill'], second['fill'], third['fill'])) {
          set = false;
        }
        if (!comparisons(first['color'], second['color'], third['color'])) {
          set = false;
        }
        if (set) {
          return [i, j, k]
        }
      }
    }
  }
}

function clickCards(className) {
  var cards = document.getElementsByClassName(className);
  var data = getData(cards);
  var set = findSet(data);
  if (set == undefined){return false;}
  for (var i=0; i<set.length; i++) {
    cards[set[i]].click();
  }
  return true;
}

async function run(ms){
  var className = getClassName();
  while (true) {
    await new Promise(r => setTimeout(r, ms));
    cardsClicked = clickCards(className);
    if (!cardsClicked) {break;}
  }
}
