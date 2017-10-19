//ShowStart
function hoistingDemo2(){
  function f1(){
    console.log("I'm f1");
  }
  var f2;

  f1();
  f2();
  f2 = function(){
    console.log("Yes, but I'm f2");
  }
}
//ShowEnd
/**#This is how the JavaScript interpreter sees <b>script2.js</b>.<br/> <code>function</code> declarations are fully hoisted, but not assignments f2 = ?#**/