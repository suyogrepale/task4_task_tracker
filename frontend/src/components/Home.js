import React, { useEffect, useState } from 'react';
import { getTasks } from '../services/api';
import TaskItem from '../components/TaskItem';
import TaskForm from './TaskForm';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      // await deleteTask(taskId);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateTask = async (taskId, updatedTask) => {
    try {
      // await updateTask(taskId, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, ...updatedTask } : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
        />
      ))}
      <TaskForm onAddTask={handleAddTask} />
    </div>
  );
};

export default Home;
