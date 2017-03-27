import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MainDashboard } from './components/MainDashboard';
import { Login, Signup, Authenticate } from './components/Auth';
import './App.css';


const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Authenticate(MainDashboard)} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </div>
  </Router> 
);


export default App;
