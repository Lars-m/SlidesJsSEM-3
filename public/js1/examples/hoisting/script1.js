//ShowStart
function hoistingDemo1() {
  console.log("Value of myCoolObject: " + myCoolObject);

  if (!myCoolObject) {
    var myCoolObject = {value: "Wau, I'm cool"};
    console.log(myCoolObject.value);
  }
}
//ShowEnd
/**#What would you expect to see when this script is executed? (Open dev tools)#**/
