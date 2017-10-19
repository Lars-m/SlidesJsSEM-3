
// Note these four lines are "done" like this because this app's runs via CDN's
// and Babel-transpiling are done one the client
var ReactRouter = window.ReactRouter;
var React = window.React;
var ReactDOM = window.ReactDOM;
var ReactRouterDOM = window.ReactRouterDOM;
var { BrowserRouter, HashRouter, Route, Link, NavLink} = ReactRouterDOM;

let Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

let About = () => (
  <div>
    <h2>About</h2>
  </div>
)

let Topic = ({ match }) => (
  <div className="topic">
    <h3>{match.params.topicId}</h3>
  </div>
)

let Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <NavLink activeClassName="activeV2" to={`${match.url}/rendering`}>
          Rendering with React
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="activeV2" to={`${match.url}/components`}>
          Components
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="activeV2" to={`${match.url}/props-v-state`}>
          Props v. State
        </NavLink>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

let BasicExample = () =>(
  <HashRouter>
    <div>
      <ul className="header">
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/topics">Topics</NavLink></li>
      </ul>
      <hr/>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </HashRouter>
)
ReactDOM.render(
  <BasicExample  />, document.querySelector("#root")
);






