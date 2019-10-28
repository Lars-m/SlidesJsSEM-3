//AllTodos start
class AllTodos extends React.Component { //YELLOW
  constructor(props) {
    super(props);
  }
  render() {
    const lis = this.props.todos.map((j, i) => (<li key={i}>{j}</li>))
    return (
      <ul>
        {lis}
      </ul>
    );
  }
}
//AllTodos end
//AddTodo start
class AddTodo extends React.Component { //RED
  constructor() {
    super();
    this.state = { newTodo: "" }
  }
  handleChange = (evt) => {
    this.setState({ newTodo: evt.target.value })
  }
  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.saveTodo(this.state.newTodo);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.newTodo} onChange={this.handleChange} /><br />
          <button>Save</button>
        </form>
      </div>
    );
  }
}
//AddTodo end

//App start
class App extends React.Component { //GRAY
  constructor(props) {
    super(props);
    this.state = { todos: props.todoStore.todos };
  }
  saveTodo = (joke) => {
    this.props.todoStore.addTodo(joke);
    this.setState({ todos: this.props.todoStore.todos });
  }
  render() {
    return (
      <div className="container row">
        <p>Random Todo: <span> {this.props.todoStore.getRandomTodo()}</span></p>
        <div className="col1">
          <p className="head">Add Todo</p>
          <AddTodo saveTodo={this.saveTodo} />
        </div>
        <div className="col2">
          <p className="head">All Todo's</p>
          <AllTodos todos={this.state.todos} />
        </div>
      </div>
    );
  }
}
//App end

//TodoStore start
class TodoStore {
  constructor() {
    this._todos = [
      "Study hard",
      "Learn JavaScript",
      "Learn React",
    ]
  }
  addTodo(todo) {
    this._todos.push(todo);
  }
  getRandomTodo() {
    return this._todos[Math.floor(Math.random()*this._todos.length)];
  }
  get todos() {
    return this._todos;
  }
}
//TodoStore end

let store = new TodoStore();

ReactDOM.render(
  <App todoStore={store} />, document.getElementById('root')
);
