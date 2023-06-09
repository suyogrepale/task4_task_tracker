const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks from the database' });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = new Task({
      title,
      description,
    });

    await newTask.save();

    res.status(201).json(newTask);
    // TODO: Create a new task in the database using the Task model
    // Example: const newTask = await Task.create({ title, description });

    // TODO: Return the newly created task as a response
    // Example: res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// GET a specific task by ID
router.get('/:id', (req, res) => {
  // TODO: Implement logic to fetch a task by ID from the database
  res.send(`Get task with ID: ${req.params.id}`);
});

// PUT (update) a specific task by ID
router.put('/:id', (req, res) => {
  // TODO: Implement logic to update a task by ID in the database
  res.send(`Update task with ID: ${req.params.id}`);
});

// DELETE a specific task by ID
router.delete('/:id', (req, res) => {
  // TODO: Implement logic to delete a task by ID from the database
  res.send(`Delete task with ID: ${req.params.id}`);
});

module.exports = router;
