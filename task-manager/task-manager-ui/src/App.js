import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
  return (
    <div>
      <h1>Task Manager</h1>
      <TaskList />
      <TaskForm />
    </div>
  );
};

export default App;
