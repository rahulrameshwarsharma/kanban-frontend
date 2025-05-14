// src/pages/Board/Column.jsx
import React from 'react';
import TaskCard from './TaskCard';

const Column = ({ column }) => {
  return (
    <div className="column">
      <h2>{column.title}</h2>
      {column.tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
      <button className="add-task-btn">+ Add Task</button>
    </div>
  );
};

export default Column;
