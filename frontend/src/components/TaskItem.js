import React, { useState } from 'react';
import { deleteTask } from '../services/api';
import EditTask from './EditTask';

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      onDelete(task._id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (updatedTask) => {
    setEditMode(false);
    onUpdate(updatedTask);
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => setEditMode(true)}>Edit</button>
      {editMode && (
        <EditTask task={task} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default TaskItem;
