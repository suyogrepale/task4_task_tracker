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
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title;
    task.description = description;

    await task.save();

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE a specific task by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Task.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.put('/:id/complete', async (req, res) => {
  try {
    const taskId = req.params.id;
    const { completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
