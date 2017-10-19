//ShowStart
function hoistingDemo1() {
  var myCoolObject;
  alert("Value of myCoolObject: " + myCoolObject);

  if (!myCoolObject) {
    myCoolObject= {value: "Wau, I'm cool"};//the declaration is hoisted
    alert(myCoolObject.value);
  }
}
//ShowEnd
/**#This is how the JavaScript interpreter sees script1.js.<br/> <code>var</code> declarations are hoisted, but not assignments?#**/