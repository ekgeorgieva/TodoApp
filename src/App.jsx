import "./App.css";

function App() {
  return (
    <div className="mainContainer">
      <div className="pending">
        <div className="filterLeft">
          <label>Filter by:
          <select className="Filter by:">
            <option>Ekaterina</option>
            <option>Bret</option>
          </select>
          </label>
          <label>Sort:
          <select className="sort">
            <option>Title (asc)</option>
            <option>Title (desc)</option>
          </select>
          </label>
        </div>
        
        <div className="todoList">
          <h2>Pending:</h2>
          <li className="listItem">Някакъв текс
          <button className="submitButton">Complete</button>
          </li>
          <li className="listItem">Някакъв текс
          <button className="submitButton">Complete</button>
          </li>
        </div>
      </div>

      <div className="completed">
        <div className="filterRight">
          <label>Sort:
          <select className="sortCompleted">
            <option>Title (asc)</option>
            <option>Title (desc)</option>
          </select>
          </label>
        </div>

        
        <ul className="todoList">
          <h2>Completed:</h2>
          <li className="listItem">Completed ToDo
          <p className="completedDate">Completed on: 25.04.2026</p>
          <button className="undoButton">Undo</button>
          </li>
        </ul>
      </div>
    </div>
  );
}




export default App;