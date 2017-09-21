
// Note these four lines are "done" like this because this app's runs via CDN's
// and Babel-transpiling are done one the client
var ReactRouter = window.ReactRouter;
var React = window.React;
var ReactDOM = window.ReactDOM;
var { Router, Route, IndexRoute, IndexLink, hashHistory, Link} = ReactRouter;

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
      {props.route.books.map((book) => <li key={book.id}>
        {book.title} <Link to={`products/details/${book.id}`}>(details)</Link></li>)}
    </ul>
  </div>
)
//Views end

class Details extends React.Component {
  render() {
    let id = this.props.params.id;
    let book = this.props.route.books.filter((book) => {
      return book.id === Number(id);
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
//DataStore for this Demo
class BookStore {

  constructor() {
    this._books = [
      { id: 1,title: "How to Learn JavaScript - Vol 1", info: "Study hard",moreInfo: "" },
      { id: 2,title: "How to Learn ES6", info: "Complete all exercises :-)",moreInfo: "" },
      { id: 3,title: "How to Learn React",info: "Complete all your CA's",moreInfo: ""},
      { id: 4,title: "Learn JavaScript, React and MobX",info: "Don't drink beers, until Friday (after four)",
                      moreInfo: "5 Points = 5 beers ;-)"
      }
    ]
  }
  get books(){
    return this._books;
  }
}
//Router start
class RouterComponent extends React.Component {
  constructor() {
    super();
  }

  render() {
    var books = this.props.bookStore.books;
    return (
      <div>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home}></IndexRoute>
            <Route path="products" component={Product}
                   books={books}/>
            <Route path="products/details/:id" component={Details}
                   books={books}/>
            <Route path="company" component={Company}/>
            <Route path="blog" component={Blog}/>
          </Route>
        </Router>
      </div>
    );
  }
}
//Router end

let bookStore = new BookStore();

ReactDOM.render(
  <RouterComponent bookStore={bookStore}  />, document.querySelector("#root")
);






