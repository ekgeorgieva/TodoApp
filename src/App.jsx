import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {

  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setUserSelect] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); 
  const [completedSort, setCompletedSort] = useState("asc"); 
  const [visibleCount, setVisibleCount] = useState(10);
  const [visibleComplet, setVisibleComplet] = useState(10);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => setUsers(data));

      fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        const initialTodos = data.map(todo => ({
          ...todo,
          completedAt: todo.completed ? new Date().toISOString() : null
        }));
        setTodos(initialTodos);
      });
  }, []);

  const toggleTodoStatus = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        const newStatus = !todo.completed;
        return {
          ...todo,
          completed: newStatus,
          completedAt: newStatus ? new Date().toISOString() : null,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  let filtered = todos.filter((todo) => {
    if (selectedUser === "") {
      return true;
    } 
    return todo.userId === Number(selectedUser);
  });

  let pendingList = filtered
    .filter((t) => !t.completed)
    .sort((a, b) => {
      return sortOrder === "asc" 
        ? a.title.localeCompare(b.title) 
        : b.title.localeCompare(a.title);
    });

  let completedList = filtered
    .filter((t) => t.completed)
    .sort((a, b) => {
      const dateA = new Date(a.completedAt);
      const dateB = new Date(b.completedAt);
      return completedSort === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="mainContainer">
      <div className="pending">
        <div className="filterLeft">
          <label>Filter by:
          <select onChange={(e) => setUserSelect(e.target.value)}>
              <option value="">All Users</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          {/* <select className="Filter by:">
            <option>Name</option>
            <option>Ekaterina</option>
            <option>Amanda</option>
            <option>Hristo</option>
            <option>Nadq</option>
          </select> */}
          </label>
          <label>Sort:
          <select onChange={(e) => setSortOrder(e.target.value === "Name (A-Z)" ? "asc" : "desc")}>
              <option>Name (A-Z)</option>
              <option>Name (Z-A)</option>
          </select>
          {/* <select className="sort">
            <option>Name (A-Z)</option>
            <option>Name (Z-A)</option>
          </select> */}
          </label>
        </div>
        
        <div className="todoList">
          <h2>Pending: ({pendingList.length})</h2>
          {pendingList.slice(0, visibleCount).map((todo) => (
            <li key={todo.id} className="listItem">
              {todo.title}
              <button className="submitButton" onClick={() => toggleTodoStatus(todo.id)}>Complete</button>
            </li>
          ))}
          {visibleCount < pendingList.length && (
            <button className="loadMoreButton"onClick={() => setVisibleCount(prev => prev + 10)}>Load More...</button>
          )}
        </div>
        {/*
          {/* <li className="listItem">Някакъв текс
          <button className="submitButton">Complete</button>
          </li>
          <li className="listItem">Някакъв текс
          <button className="submitButton">Complete</button>
          </li>
          <li className="listItem">Някакъв текс
          <button className="submitButton">Complete</button>
          </li> */}
        {/* </div> */}
      </div>

      <div className="completed">
        <div className="filterRight">
          <label>Sort:
          <select onChange={(e) => setCompletedSort(e.target.value === "Oldest first" ? "asc" : "desc")}>
              <option>Oldest</option>
              <option>Latest</option>
            </select>
          {/* <select className="sortCompleted">
            <option>Date (asc)</option>
            <option>Title (asc)</option>
            <option>Title (desc)</option>
          </select> */}
          </label>
        </div>

        <ul className="todoList">
          <h2>Completed: ({completedList.length})</h2>
          {completedList.slice(0, visibleComplet).map((todo) => (
            <li key={todo.id} className="listItem">
              <div className="itemTextWrapper">
                <span>{todo.title}</span>
                <p className="completedDate">
                  Completed on: {new Date(todo.completedAt).toLocaleString("bg-BG")}
                </p>
              </div>
              <button className="undoButton" onClick={() => toggleTodoStatus(todo.id)}>Undo</button>
            </li>
          ))}
          {visibleComplet < completedList.length && (
            <button className="loadMoreButtonC" onClick={() => setVisibleComplet(prev => prev + 10)}>Load More...</button>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;