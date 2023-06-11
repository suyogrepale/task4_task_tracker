import React, { useState } from 'react';
import { createTask } from '../services/api';

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const titleMinLength = 3;
  const titleMaxLength = 50;
  const descriptionMinLength = 10;
  const descriptionMaxLength = 200;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      if (!title) setTitleError('Title is required');
      if (!description) setDescriptionError('Description is required');
      return;
    }

    if (title.length < titleMinLength || title.length > titleMaxLength) {
      setTitleError(
        `Title must be between ${titleMinLength} and ${titleMaxLength} characters`
      );
      return;
    }

    if (
      description.length < descriptionMinLength ||
      description.length > descriptionMaxLength
    ) {
      setDescriptionError(
        `Description must be between ${descriptionMinLength} and ${descriptionMaxLength} characters`
      );
      return;
    }
  
    // Create a new task object
    const newTask = {
      title,
      description,
    };
    console.log(newTask);
    try {
      // Send a POST request to the server to create a new task
      const response = await createTask(newTask);
  
      console.log(response.data); // Log the response for testing purposes
  
      // Clear the form inputs after successful submission
      setTitle('');
      setDescription('');
      setTitleError('');
      setDescriptionError('');

      // Update the tasks list in the Home component
      onAddTask(response.data);
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
            minLength={titleMinLength}
            maxLength={titleMaxLength}
            required
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minLength={descriptionMinLength}
            maxLength={descriptionMaxLength}
            required
          ></textarea>
          {descriptionError && <span className="error">{descriptionError}</span>}
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
