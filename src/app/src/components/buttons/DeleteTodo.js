import React from "react";
import axios from "axios";

const DeleteTodo = ({ endpoint, fetchTodos, message }) => {
  // Delete all todos from the server
  const deleteAllTodos = () => {
    axios
      .delete(endpoint)
      .then(function () {
        fetchTodos();
      })
      // Catch errors if any
      .catch(function (error) {
        message(`error : ${error.response.data.error}`);
      });
  };

  return (
    <div>
      <button onClick={deleteAllTodos}>Delete All Todos!</button>
    </div>
  );
};

export default DeleteTodo;
