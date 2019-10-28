//import PropTypes from 'prop-types';
//start
//Component using props
function Welcome(props) {
  return <h2>Hello, {props.name}</h2>;
}
//Set Type
Welcome.propTypes = {
  name: PropTypes.string
}
//Set Default Value
Welcome.defaultProps = {
  name: "UNKNOWN"
}
//end

//start app
//Using the Component and passing values to props
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      {/* Observe: no props value passed in */}
      <Welcome />
    </div>
  );
}
//end app

ReactDOM.render(
  <App />,document.querySelector("#root")
);