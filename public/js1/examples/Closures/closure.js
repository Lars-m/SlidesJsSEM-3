//ShowStart
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
}
var myFunc = makeFunc();
//myFunc();
//ShowEnd
/**#This does exactly the same as the previous example<br/>
 This may seem unintuitive, since local variables normally only exist for the duration of that function's execution</br>
 The reason is; that myFunc has become a <b>Closure</b>
 #**/
