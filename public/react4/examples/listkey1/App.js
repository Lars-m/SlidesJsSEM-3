//start
class GradePresenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {students: this.props.data};
  }
  render() {
    const rows = this.state.students.map((s) =>
      <tr key={s.id}>
        <td>{s.id}</td> <td>{s.name}</td> <td>{s.grade}</td>
      </tr>
    );
    return (
      <div>
        <h3>List of grades</h3>
        <table className="table">
          <tr><th>Id</th> <th>Name</th> <th>Grade</th></tr>
          {rows}
        </table>
      </div>
    )
  }
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

/**#<p><b>Observe:</b> How the <b>map-callback</b> adds a unique id to each row</p>
 <p>
 <b>Keys</b> help React identify which items have <em>changed</em>, are <em>added</em>, or are <em>removed</em>.
 Keys should be given to the elements inside the array to give the elements a stable identity:
 </p>
 <p>If you forget to add keys, React will provide a warning!
 #**/
