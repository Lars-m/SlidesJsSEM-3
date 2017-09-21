var ReactRouter = window.ReactRouter;
var React = window.React;
var ReactDOM = window.ReactDOM;

var {
  Router, Route, IndexRoute, IndexLink, hashHistory,
  Link
} = ReactRouter;

//Outer View start
class App extends React.Component {
  render() {
    return (
      <div>
        <ul className="header">
          <li><IndexLink activeClassName="active" to="/">Home</IndexLink></li>
          <li><Link activeClassName="active" to="/products">Products</Link></li>
          <li><Link activeClassName="active" to="/company">Company</Link></li>
          <li><Link activeClassName="active" to="/blog">Blog</Link></li>
        </ul>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
//Outer View end

//Views start
const Home = () => (
  <div>
    <h2>Home View</h2>
    <p>Info about this site</p>
  </div>
)

const Company = () => {
  return (
    <div>
      <h2>About Us</h2>
      <p>Our about page</p>
    </div>
  )
}
const Blog = () => <h2>Our Company Blog</h2>

const Product = (props) => (
  <div>
    <h2>Our Products</h2>
    <h4>All our great books </h4>
    <ul>
      {props.route.books.map((book, index) => <li key={index}>
        {book.title} <Link to={`products/details/${index}`}>(details)</Link></li>)}
    </ul>
  </div>
)
//Views end

const HOC = (InnerComponent) => class extends React.Component {

  constructor() {
    super();
    this.state = {
      books: [
        {title: "How to Learn JavaScript - Vol 1", info: "Study hard"}
        , {title: "How to Learn ES6", info: "Complete all exercises :-)"}
        , {
          title: "How to Learn React",
          info: "Complete all your CA's", moreInfo: ""
        }
        , {
          title: "How to become a specialist in Computer Science - Vol 4",
          info: "Don't drink beers, until Friday (after four)",
          moreInfo: "5 Points = 5 beers ;-)"
        }
      ]
    };
  }

  render() {
    return (
      <InnerComponent {...this.props} {...this.state} />
    );
  }
};

class Details extends React.Component {
  render() {
    let id = this.props.params.id;
    let book = this.props.route.books.filter((book, index) => {
      return index === Number(id);
    })[0];
    return (
      <div>
        <h3 style={{color: "steelblue"}}>Detailed info for the title: {book.title}</h3>
        <h4> {book.info}</h4>
        <h4>{book.moreInfo}</h4>
        <br />
        <Link to="/products">Products</Link>
      </div>
    );
  }
}

//Router start
class RouterComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path="products" component={Product}
                   books={this.props.books}/>
            <Route path="products/details/:id" component={Details}
                   books={this.props.books}/>
            <Route path="company" component={Company}/>
            <Route path="blog" component={Blog}/>
          </Route>
        </Router>
      </div>
    );
  }
}
//Router end

let TopLevel = HOC(RouterComponent);
ReactDOM.render(
  <TopLevel />, document.getElementById("root")
);





