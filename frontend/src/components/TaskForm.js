import React, {useState} from 'react';
import axios from 'axios';

const TaskForm = () => {
    const[title,setTitle] = useState('');
    const[description,setDescription]=useState('');

    const handleSubmit = async(e)=>{
        e.preventDefault();

    // Create a new task object
    const newTask = {
        title,
        description,
        };
  
    try {
        // Send a POST request to the server to create a new task
        const response = await axios.post('/api/tasks', newTask);
        
        console.log(response.data); // Log the response for testing purposes

        // Clear the form inputs after successful submission
        setTitle('');
        setDescription('');
        } catch (error) {
        console.error(error);
        }
    };
    return (
        <div>
          <h2>Add New Task</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit">Add Task</button>
          </form>
        </div>
      );
};

export default TaskForm;