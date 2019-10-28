//Start
const aStyle= {
  color: "darkBlue",
  fontSize : 15
};
const element = (
  <div>
    <h2 className="green" >Hello!</h2>
    <h2>Hi {"PETER".toLowerCase()}</h2>
    <div style={aStyle}>Nice to see you</div>
  </div>
);
//End

//Render the JSX declared in element
ReactDOM.render(
  element,
  document.getElementById('root')
);
//Render End
/**#<b>Note:</b></br><ul><li><b>JavaScript</b>, can be embedded in JSX by wrapping it in curly braces</li>
 <li><b>Styling</B> React recommends using inline styles.
 When setting inline styles, you must use camelCase syntax.
 React will also automatically append px after the number value on specific elements</li>
 <li>React DOM uses <em>camelCase property naming convention</em> instead of HTML attribute names.
 For example, <b>class</b> becomes <b>className</b> in JSX</li></ul>
 #**/