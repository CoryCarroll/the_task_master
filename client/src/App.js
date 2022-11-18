import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TaskDash from './pages/TaskDashboard';
import SavedBooks from './pages/SavedBooks';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <>
        <Login />
        <TaskDash />
      </>
    </Router>
  );
}

export default App;
