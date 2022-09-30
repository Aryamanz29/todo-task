import React from "react";

const TodosList = ({ todo }) => {
  // Iterate over todos
  const todosList = todo.map((todo) => {
    return <li>{todo.todo}</li>;
  });

  return (
    <div>
      <h1>List of TODOs</h1>
      {todo && todosList}
    </div>
  );
};

export default TodosList;
