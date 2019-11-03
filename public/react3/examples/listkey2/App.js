//start constructor
class GradePresenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: this.props.data,
      filterVal: -2
    };
  }
  //end constructor

  //map and filter start
  onFilterChange =(evt) => {
    this.setState({filterVal: evt.target.value});
  }
  render() {
    let data = this.state.students;
    const rows =
      data.filter(s=> s.grade >=this.state.filterVal).map((s) =>
      <tr key={s.id}>
        <td>{s.id}</td> <td>{s.name}</td> <td>{s.grade}</td>
      </tr>
    );
    return (
      <div>
        Show grades above: <input onChange={this.onFilterChange}/><br/>
        <table className="table">
          <tr><th>Id</th> <th>Name</th> <th>Grade</th></tr>
          {rows}
        </table>
      </div>
    )
  }
  //map and filter end
}
//end

//start passing in data
let students = [
      {id: 1, name: "studentA", grade: 7},
      {id: 2, name: "studentB", grade: 10},
      {id: 3, name: "studentC", grade: 4},
      {id: 4, name: "studentD", grade: 12},
    ]

ReactDOM.render(
  <GradePresenter data={students}/>,
   document.getElementById("root")
);
//end passing in data

