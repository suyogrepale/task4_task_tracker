import React, { useState } from 'react';
import { deleteTask ,updateTaskCompletion} from '../services/api';
import EditTask from './EditTask';
import './styles/TaskItem.css'; // Import the CSS file for styling

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);

  const handleCompletionChange = async (e) => {
    const completed = e.target.checked;

    try {
      await updateTaskCompletion(task._id, completed);
      onUpdate(task._id, { completed });
    } catch (error) {
      console.error('Error updating task completion:', error);
    }
  };

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
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleCompletionChange}
      />
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => setEditMode(true)}>Edit</button>
      {editMode && (
        <EditTask task={task} onUpdate={handleUpdate} />
      )}
    </div>
  );
};

export default TaskItem;