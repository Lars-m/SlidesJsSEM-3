
// Note these four lines are "done" like this because this app's runs via CDN's
// and Babel-transpiling are done one the client
var ReactRouter = window.ReactRouter;
var React = window.React;
var ReactDOM = window.ReactDOM;
var ReactRouterDOM = window.ReactRouterDOM;
var { BrowserRouter, HashRouter,  Route, Link, NavLink, Switch, Prompt} = ReactRouterDOM;

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = { "book": { title: "", info: "" }, isDirty: false }
  }

  onSave = () => {
    this.props.bookStore.addBook(this.state.book);
    this.setState({ "book": { title: "", info: "" }, isDirty: false });
    this.props.onAddBook();
  }

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let book = this.state.book;
    book[name] = value;
    const dirty = book.title !== "" || book.info !== "";
    this.setState({ book, isDirty: dirty });
  }

  render() {
    console.log(this.state.isDirty);
    return (

      <div>
        Title: <input name="title" value={this.state.book.title} onChange={this.onChange} />
        Info: <input name="info" value={this.state.book.info} onChange={this.onChange} />
        <button onClick={this.onSave}>Save</button>
        <Prompt
          when={this.state.isDirty}
          message="Yoy have unsaved data that will be lost!"
        />
      </div>
    )
  }
}


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
class Product extends React.Component {
  constructor(props) {
    super(props);
    console.log("props",props);
    this.state = { bookStore: props.bookStore }
  }

  onBookWasAdded = ()=>{
    //Nice and easy way to force a rerender
    this.forceUpdate();
  }


  render() {
    const books = this.state.bookStore.books;
    let bookStore = this.state.bookStore;
    const match = this.props.match;
    return (<div>
      <h2>Our Products</h2>
      <h4>All our great books </h4>
      <ul>
        {books.map((book) => <li key={book.id}>
          <NavLink activeClassName="activeV2"
                   to={`${match.url}/detail/${book.id}`}>{book.title}</NavLink></li>)}
      </ul>
      <Link to={`${match.url}/add`}>Add book</Link>

      <div style={{ backgroundColor: "lightGray", padding: 5, marginTop: 10 }}>
        <Route path={`${match.url}/add`} render={(props) => <AddBook bookStore={bookStore}
                                                                     onAddBook={this.onBookWasAdded} />} />
        <Route path={`${match.url}/detail/:id`} render={(props) => {
          return (<Details {...props} bookStore={bookStore} />)
        }} />
      </div>
    </div>)
  }
}
//Views end

class Details extends React.Component {
  render() {
    let id = this.props.match.params.id;
    let book = this.props.bookStore.books.filter((book) => {
      return book.id === Number(id);
    })[0];
    return (
      <div style={{ padding: 4 }}>
        <h4 style={{ color: "steelblue" }}>Detailed info for the title: {book.title}</h4>
        <p>Info: {book.info}</p>
        <br />
        <Link to="/products">Products</Link>
      </div>
    );
  }
}


class Header extends React.Component {
  render() {
    return (
      <div>
        <ul className="header">
          <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
          <li><NavLink activeClassName="active" to="/products">Products</NavLink></li>
          <li><NavLink activeClassName="active" to="/company">Company</NavLink></li>
        </ul>
      </div>
    );
  }
}

//DataStore for this Demo
class BookStore {

  constructor() {
    this._books = [
      { id: 1,title: "How to Learn JavaScript - Vol 1", info: "Study hard"},
      { id: 2,title: "How to Learn ES6", info: "Complete all exercises :-)"},
      { id: 3,title: "How to Learn React",info: "Complete all your CA's"},
      { id: 4,title: "Learn JavaScript, React and MobX",info: "Don't drink beers, until Friday (after four)"
      }
    ]
    this._nextID= 5;
  }
  get books(){
    return this._books;
  }
  addBook(book){
    book.id = this._nextID;
    this._books.push(book);
    this._nextID++;
  }
}

let bookStore = new BookStore();
//End of BookStore

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <HashRouter >
        <div>
          <Header />
          <Switch>
            <Route path="/products" render={(props) => (<Product {...props} bookStore={this.props.bookStore} />)} />
            <Route path="/company" component={Company} />
            <Route component={Home}></Route>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
ReactDOM.render(
  <App bookStore={bookStore} />, document.querySelector("#root")
);






