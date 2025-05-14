import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./Board.css";

const Board = () => {
  const [board, setBoard] = useState(null);
  const [newColumn, setNewColumn] = useState("");
  const [newTask, setNewTask] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBoard();
  }, []);

  const fetchBoard = async () => {
    try {
      const res = await axios.get("/board");
      setBoard(res.data);
    } catch (err) {
      console.error("error", err);
      setError("Failed to load board");
    }
  };

  const handleAddColumn = async () => {
    if (!newColumn.trim()) return;
    try {
      await axios.post("/column", {
        title: newColumn,
        order: board?.columns?.length || 0,
      });

      setNewColumn("");
      fetchBoard();
    } catch (err) {
      console.error("error", err);
      setError("Error adding column");
    }
  };

  const handleAddTask = async (columnId) => {
    const taskTitle = newTask[columnId]?.trim();
    if (!taskTitle) return;

    try {
      await axios.post("/task", {
        columnId,
        title: taskTitle,
        order: board?.tasks?.filter((task) => task.column === columnId).length || 0,
        description: "", // default empty if not used
      });

      setNewTask((prev) => ({ ...prev, [columnId]: "" }));
      fetchBoard();
    } catch (err) {
      console.error("error", err);
      setError("Error adding task");
    }
  };

  const handleUpdateTask = async (taskId, updatedTitle) => {
    const newTitle = prompt("New title:", updatedTitle);
    if (!newTitle?.trim()) return;

    try {
      await axios.patch(`/task/${taskId}`, { title: newTitle });
      fetchBoard();
    } catch (err) {
      console.error(err);
      setError("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/task/${taskId}`);
      fetchBoard();
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
    }
  };

  return (
    <div className="board-container">
      <h2>Kanban Board</h2>

      <div className="add-column">
        <input
          type="text"
          placeholder="New Column Name"
          value={newColumn}
          onChange={(e) => setNewColumn(e.target.value)}
        />
        <button onClick={handleAddColumn}>Add Column</button>
      </div>

      {error && <p className="board-error">{error}</p>}

      <div className="board-columns">
        {board?.columns?.map((col) => (
          <div className="board-column" key={col._id}>
            <h3>{col.title}</h3>

            {/* Tasks for this column */}
            {board?.tasks
              ?.filter((task) => task.column === col._id)
              .map((task) => (
                <div className="task-card" key={task._id}>
                  {task.title}

                  <button
                    onClick={() => handleUpdateTask(task._id, task.title)}
                    title="Edit"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              ))}

            <div className="add-task">
              <input
                type="text"
                placeholder="New Task"
                value={newTask[col._id] || ""}
                onChange={(e) =>
                  setNewTask((prev) => ({
                    ...prev,
                    [col._id]: e.target.value,
                  }))
                }
              />
              <button onClick={() => handleAddTask(col._id)}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
