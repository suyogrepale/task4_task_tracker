const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();

// This line is present only to pass the values from axios to express as a json object.
app.use(express.json());
app.use(cors());

const tasksRouter = require('./routes/tasks'); // Import the tasks router

app.use('/api/tasks', tasksRouter); // Use the tasks router for '/api/tasks' routes

// Define a route handler for the root URL

// Set up server port
const port = 5000;

// Set up routes

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tasktracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useCreateIndex: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });


