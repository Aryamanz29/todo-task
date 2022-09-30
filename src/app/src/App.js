import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import TodoForm from "./components/todoform/TodoForm";
import TodoList from "./components/todolist/TodoList";

export function App() {
  // Set component const & vars
  const _TODO_ENDPOINT = "http://localhost:8000/todos/";
  const todoFormFieldRef = useRef(null);
  const [todo, setTodos] = useState([]);
  const [todoMsg, setTodoMsg] = useState("");

  // Fetches all todos from the server
  const fetchTodos = async () => {
    try {
      const todos = await axios.get(_TODO_ENDPOINT);
      setTodos(todos.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Fetch todos from backend after component rendered
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
        <TodoList todo={todo} />
        <TodoForm
          endpoint={_TODO_ENDPOINT}
          fetchTodos={fetchTodos}
          todoField={todoFormFieldRef}
          message={setTodoMsg}
        />
        <p>{todoMsg}</p>
    </div>
  );
}

export default App;
