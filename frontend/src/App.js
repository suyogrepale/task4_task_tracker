import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';
import TaskDetails from './components/TaskDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
          <Route path="/details/:id" element={<TaskDetails />} />
        </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
