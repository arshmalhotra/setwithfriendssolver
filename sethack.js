function getData(cards) {
  var cardsDict = {}
  for (var i=0; i<cards.length; i++) {
    if (cards[i].classList.length == 2) {
      var svgs = cards[i].getElementsByTagName("svg");
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
  }
  return cardsDict
}

function comparisons(a, b, c) {
  var allEqual = (a == b && b == c);
  var allUnequal = (a != b && b != c && a != c);
  return allEqual || allUnequal
}

function findSet(cardsDict) {
  var keys = Object.keys(cardsDict)
  var length = keys.length
  for (var i=0; i<length; i++) {
    var first = cardsDict[keys[i]];
    for (var j=i+1; j<length; j++) {
      var second = cardsDict[keys[j]];
      for (var k=j+1; k<length; k++) {
        var third = cardsDict[keys[k]];
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
          return [keys[i], keys[j], keys[k]]
        }
      }
    }
  }
}

function clickCards() {
  var cards = document.querySelectorAll('span.MuiTypography-root.MuiTypography-caption.MuiTypography-alignCenter ~ div > div');
  var data = getData(cards);
  var set = findSet(data);
  if (set == undefined){return false;}
  for (var i=0; i<set.length; i++) {
    cards[set[i]].click();
  }
  return true;
}

async function run(ms){
  while (true) {
    await new Promise(r => setTimeout(r, ms));
    cardsClicked = clickCards();
    if (!cardsClicked) {break;}
  }
}
