import {createTask} from '../services/api';

const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await createTask('/api/tasks', {
        title,
        description,
      });
      
      // Handle the successful response here
      console.log(response.data); // Assuming the response contains data

      // TODO: Handle the response, update the UI, or redirect if necessary
    } catch (error) {
      console.error(error);
      // TODO: Handle error response or display an error message to the user
    }
  };
  