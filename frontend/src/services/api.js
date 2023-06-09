import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getTasks = () => {
    return api.get('/tasks');
};

export const createTask = (taskData) => {
    return api.post('/tasks', taskData);
};
  


export default api;
