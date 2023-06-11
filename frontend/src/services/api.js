import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getTasks = (sortField, sortOrder) => {
  return api.get('/tasks', {
    params: {
      sortField,
      sortOrder,
    }
  });
};

export const createTask = (taskData) => {
  return api.post('/tasks', taskData);
};

export const deleteTask = (taskId) => {
  return api.delete(`/tasks/${taskId}`);
};

export const updateTask = (taskId, taskData) => {
  return api.put(`/tasks/${taskId}`, taskData);
};

export default api;
