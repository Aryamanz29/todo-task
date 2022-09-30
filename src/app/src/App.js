import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export function App() {
  // set component const & vars
  const _TODO_ENDPOINT = "http://localhost:8000/todos/";
  const [todo, setTodos] = useState([]);
  const [todoMsg, setTodoMsg] = useState("");

  // fetch todolist from backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await axios.get(_TODO_ENDPOINT);
        setTodos(todos.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchTodos();
  }, []);

  // Iterate over todos
  const useTodos = todo.map((todo) => {
    return <li>{todo.todo}</li>;
  });

  // Handle Todo Formfield
  const todoFormFieldRef = useRef(null);
  const handleTodoSubmit = (event) => {
    event.preventDefault();
    // Get todo form data
    console.log(todoFormFieldRef);
    const todoData = { todo: todoFormFieldRef.current.value };
    // Post todo data to the server
    axios
      .post(_TODO_ENDPOINT, todoData)
      .then(function (response) {
        // If successfully created show message and reload page
        if (response.status === 201) {
          setTodoMsg("Todo has been added successfully!");
          window.location.reload();
        }
      })
      // Otherwise catch errors and display message
      .catch(function (error) {
        console.log(error);
        setTodoMsg(`error : ${error.response.data.error}`);
      });
    // After successful submission clear form fields
    event.target.reset();
  };

  return (
    <div className="App">
      <div>
        <h1>List of TODOs</h1>
        {/* Show todos if exists */}
        {todo && useTodos}
      </div>

      <div>
        <form onSubmit={handleTodoSubmit} style={{ marginTop: "20px" }}>
          <div style={{ marginTop: "5px" }}>
            <label for="todoFormField">ToDo:</label>
            <input type="text" id="todoFormField" ref={todoFormFieldRef} />
          </div>
          <button type="submit" style={{ marginTop: "20px" }}>
            Add ToDo!
          </button>
          <p>{todoMsg}</p>
        </form>
      </div>
    </div>
  );
}

export default App;
