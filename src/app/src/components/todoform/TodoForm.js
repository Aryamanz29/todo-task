import React from "react";
import axios from "axios";
import DeleteTodo from "../buttons/DeleteTodo";

const TodoForm = ({ endpoint, fetchTodos, todoField, message }) => {
  // Handle Todo Formfield
  const handleTodoSubmit = (event) => {
    event.preventDefault();
    const todoData = { todo: todoField.current.value };
    // Post todo data to the server
    axios
      .post(endpoint, todoData)
      .then(function (response) {
        // If successfully created show message and reload page
        if (response.status === 201) {
          message('')
          fetchTodos();
        }
      })
      // Otherwise catch errors and display message
      .catch(function (error) {
        console.log(error);
        message(`error : ${error.response.data.error}`);
      });
    // After successful submission clear form fields
    event.target.reset();
  };

  return (
    <div>
      <form onSubmit={handleTodoSubmit} style={{ marginTop: "20px" }}>
        <div style={{ marginTop: "5px" }}>
          <label for="todoFormField">Todo:</label>
          <input
            type="text"
            id="todoFormField"
            ref={todoField}
            style={{ marginLeft: "10px" }}
          />
        </div>
        <button
          type="submit"
          style={{ marginTop: "20px", marginBottom: "10px" }}
        >
          Add Todo!
        </button>
      </form>
      <DeleteTodo
        endpoint={endpoint}
        fetchTodos={fetchTodos}
        message={message}
      />
    </div>
  );
};

export default TodoForm;
