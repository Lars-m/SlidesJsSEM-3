class AppWithChilden extends React.Component {
  render() {
    return (
      <div>
        <p>Below you see the children passed in:</p>
        <div className="green">{this.props.children}</div>
      </div>
    )}
}

ReactDOM.render(
  <AppWithChilden>
    <span>Hello </span>
    <span>JavaScript </span>
    <span>Class </span>
    <span>How are you?</span>
  </AppWithChilden>
  ,document.getElementById('root')
);