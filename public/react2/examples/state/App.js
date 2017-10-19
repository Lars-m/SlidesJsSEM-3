//import React from 'react';

//Blink Start
class Blink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showText: true};

    // Toggle the state every second
    setInterval(() => {
      this.setState({ showText: !this.state.showText });
  }, 1000);
  }
  render() {
    let display = this.state.showText ? this.props.text : ' '
    return (
      <h2>{display}</h2>
  );
  }
}//Blink End

//Render Start
ReactDOM.render(
  <Blink text="Hello Class"/>,
  document.querySelector("#root")
);
//Render End
/**#<p><b>Note:</b></p><ul><li>How this example passes in the text-value as props</li>
  <li>State can otherwise only be changed via the setState(..) method (in this example, state-value are changed via a timer)</li>
 <li>Class components should always call the base constructor with props</li></ul>
#**/


