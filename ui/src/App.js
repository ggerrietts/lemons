import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { MainDashboard } from './components/MainDashboard';
import { Login, Signup, AuthRoute } from './components/Auth';
import './App.css';


const App = () => (
  <Router>
    <div>
      <AuthRoute exact path="/" component={MainDashboard} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </div>
  </Router> 
);


export default App;
