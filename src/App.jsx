import "./styles.css";
import { useState } from "react";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todo, setTodos] = useState([]);
  function handleSubmit(e) {
    e.preventDefault();
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
  }
  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }
  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New todo</label>
          <input
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type="text"
          />
        </div>
        <button className="btn">ADD </button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todo.length === 0 && "No todo yet!"}
        {todo.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="btn btn-danger"
              >
                Dismiss
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
