var React = window.React;
var ReactDOM = window.ReactDOM;

//start
/* OBSERVE: How this component is responsible for both fetching
   data and presenting it*/
class ChuckJokeList extends React.Component {
  constructor() {
    super();
    this.state = { jokes: [] }
  }
  componentDidMount() {
    fetch("http://api.icndb.com/jokes/random/3")
      .then(res => res.json())
      .then(result => this.setState({jokes: result.value}));
  }
  render() {
    return <ul> {this.state.jokes.map(this.renderJoke)} </ul>;
  }
  renderJoke = ({joke}) =><li>{joke}</li>
}
//end
ReactDOM.render(
  <ChuckJokeList />, document.querySelector("#content")
);
