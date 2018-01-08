var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements

  // YOUR CODE HERE

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
      return el.id && (el.id=== selector.slice[0])
    }

  } else if (selectorType === "class") {
    // define matchFunction for class
    var matchFunction = function(el){
      var classes = selector.split(" ");
      console.log('CLASSES', classes)
      console.log('selector', selector)
     return classes.includes(selector) ? true : false
    }

  } else if (selectorType === "tag.class") {
    // define matchFunction for tag.class

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
