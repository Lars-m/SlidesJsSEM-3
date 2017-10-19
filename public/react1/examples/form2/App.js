//constructor start
class PersonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {name: "", age: null, email: ""}
    };
  }
//constructor end

//handlers start
  handleSubmit = (evt) =>{
    evt.preventDefault();
    window.alert(JSON.stringify(this.state.person));
  }

  handleInput = (event) => {
    const target = event.target;
    const prop = target.id;
    var value = target.value;
    var person = this.state.person;
    person[prop] = value;
    this.setState({
      person : person
    });
  }
//handlers end

//form start
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <input id="name" type="text" value={this.state.person.name}
                 placeholder="Name" onChange={this.handleInput}/>
          <br/>
          <input id="age" type="number" value={this.state.person.age}
                 placeholder="Age" onChange={this.handleInput}/>
          <br/>
          <input id="email" type="text" value={this.state.person.email}
                  placeholder="email" onChange={this.handleInput}/>
          <br/>
          <button >Submit</button>
        </form>
        <p>{JSON.stringify(this.state.person)}</p>
      </div>
    );
  }
  //form end
}

//render start
ReactDOM.render(
  <PersonForm/>, document.getElementById('root')
);
//render end

/**#<p><b>Observe:</b></p>
  <p>
   Make sure you understand how <b>input-id's</b> (or names) MUST match object properties in <code>Person</code>
   for this to work!
  </p>
 #**/