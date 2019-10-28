//Start
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }
  handleChange= (event) => {
     this.setState({value: event.target.value});
  }
  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
         Name: <input type="text" value={this.state.value}
                      onChange={this.handleChange} />
         <input type="submit" value="Submit" />
        <p>{JSON.stringify(this.state.value)}</p>
      </form>
    );
  }
}
//End

/**#<p><b>Observe:</b></p>
 <p>
 The event handlers are implemented with arrow-functions for easier "this"-handling</p>
 <p>See the <a href="https://facebook.github.io/react/docs/forms.html#controlled-components" target="_blank">original example </a>
 to see how it's done using <code>bind(..)</code>
 #**/

//Render start
ReactDOM.render(
  <NameForm/>,
  document.getElementById('root')
);
//Render end