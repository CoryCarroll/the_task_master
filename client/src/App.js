import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import loggedOut from './pages/loggedOut';
import TaskDash from './pages/TaskDash';
import Navbar from './components/Navbar';
import './App.css'
function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={loggedOut} />
          <Route exact path='/tasks' component={TaskDash} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
  );
}

export default App;
