var React = window.React;
var ReactDOM = window.ReactDOM;

// Container start
class ChuckJokeListContainer extends React.Component {
  constructor() {
    super();
    this.state = {jokes: []}
  }

  componentDidMount() {
    fetch("http://api.icndb.com/jokes/random/3")
      .then(res => res.json())
      .then(result => this.setState({jokes: result.value}));
  }

  /*OBSERVE: How the Container Wraps the ChuckJokeList */
  render() {
    return <ChuckJokeList jokes={this.state.jokes}/>
  }
}




// Container end

// Presenter start
/*OBSERVE: No State */
function ChuckJokeList(props) {
  return (
   <ul> {props.jokes.map(({joke}) => <li>{joke}</li> )} </ul>
  )
}
// Presenter end
ReactDOM.render(
  <ChuckJokeListContainer />, document.querySelector("#content")
);
