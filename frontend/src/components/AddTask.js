import { createTask } from '../services/api';

async function addTask(newTask){
  const response = await createTask(newTask);
  return response;
}

export default addTask;