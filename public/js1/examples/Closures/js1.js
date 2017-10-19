//ShowStart
function init() {
  var name = "Mozilla"; // Local variable
  function displayName() { // Inner function --> a closure
    alert (name); // Uses variable from the parent function
  }
  displayName();
}
//init();
//ShowEnd
/**#<em>init()</em> creates a local variable <em>name</em> and an inner function called <em>displayName()</em>.<br/>
<em>displayName()</em> is only available within the body the init() function. <br/>
<em>displayName()</em> has access to the variables of outer functions<br/>#**/
