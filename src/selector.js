var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements

  // YOUR CODE HERE

  if (matchFunc(startEl)){
    resultSet.push(startEl)
  }

  [].slice.call(startEl.children).forEach(function(child) {
        var matchingElementsStartingAtChild = traverseDomAndCollectElements(matchFunc, child);
        resultSet = resultSet.concat(matchingElementsStartingAtChild);
    })
  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag

var selectorTypeMatcher = function(selector) {

  // your code here
  if(selector[0] === "#") return "id"
  if (selector[0] === ".") return "class" 
  if(selector.includes(".")) return "tag.class"
return "tag";
}; 


// NOTE ABOUT THE MATCH FUNCTION
// remember, the returned matchFunction takes an *element* as a
// parameter and returns true/false depending on if that element
// matches the selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    // define matchFunction for id
    var matchFunction = function(el){
      return el.id && ("#" + el.id === selector)
    }

  } else if (selectorType === "class") {
    // define matchFunction for class
      matchFunction = function (el){
        var arr = el.className.split(" ");
        if (arr.indexOf(selector.slice(1))> -1){return true;}
        return false;
      }

  } else if (selectorType === "tag.class") {
    // define matchFunction for tag.class
      matchFunction = function (el){
      var select = selector.split('.');
      var tag = select[0];
      var ourClass = select[1];
      var arr = el.className.split(' ');
      if (el.tagName.toLowerCase() === tag.toLowerCase() && arr.indexOf(ourClass)> -1){
        return true;
      }
      return false;
  }
  } else if (selectorType === "tag") {
    // define matchFunction for tag
      var matchFunction = function (el) {
        return el.tagName && (el.tagName.toLowerCase() === selector.toLowerCase());
};
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
