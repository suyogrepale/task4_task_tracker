import React, { useEffect, useState, useMemo } from 'react';
import { getTasks } from '../services/api';
import TaskItem from '../components/TaskItem';
import TaskForm from './TaskForm';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [])

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedTasks = useMemo(() => {
    const copyTasks = [...tasks];
  
    copyTasks.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });
  
    return copyTasks;
  }, [tasks, sortField, sortOrder]);

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
      <div>
        Sort By:
        <select value={sortField} onChange={handleSortFieldChange}>
          <option value="title">Title</option>
          <option value="createdAt">Creation Date</option>
        </select>
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {sortedTasks.map((task) => (
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
