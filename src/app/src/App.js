import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

export function App() {
  // set component const & vars
  const _TODO_ENDPOINT = "http://localhost:8000/todos/";
  const todoFormFieldRef = useRef(null);
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

  // Handle delete all todos
  const deleteAllTodos = () => {
    // Delete todos from the server
    console.log("delete");
    axios
      .delete(_TODO_ENDPOINT)
      .then(function (response) {
        window.location.reload();
      })
      // Catch errors and display message
      .catch(function (error) {
        setTodoMsg(`error : ${error.response.data.error}`);
      });
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
            <label for="todoFormField">Todo:</label>
            <input type="text" id="todoFormField" ref={todoFormFieldRef} style={{ marginLeft: "10px" }} />
          </div>
          <button type="submit" style={{ marginTop: "20px" }}>
            Add Todo!
          </button>
        </form>
        <button onClick={deleteAllTodos} style={{ marginTop: "20px" }}>
          Delete All Todos
        </button>
        <p>{todoMsg}</p>
      </div>
    </div>
  );
}

export default App;
