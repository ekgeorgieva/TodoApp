import "./App.css";

function App() {
  return (
    <div className="mainContainer">
      <div className="pending">
        <select className="Filter by:">
          <option>Ekaterina</option>
          <option>Bret</option>
        </select>
        <select className="sort">
          <option>Title (asc)</option>
          <option>Title (desc)</option>
        </select>
        <h2>Pending:</h2>
      </div>
      <div className="completed">
      <select className="sortCompleted">
          <option>Title (asc)</option>
          <option>Title (desc)</option>
        </select>
        <h2>Completed:</h2>
      </div>
    </div>
  );
}




export default App;