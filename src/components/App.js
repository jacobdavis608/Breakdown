import React from 'react';
import './App.css';
import Home from './Home/Home';
import Upload from './Upload';
import Trending from './Trending';
import Profile from './Profile';
import Login from './Login';
import Navigation from './Navigation/Navigation';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Navigation/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/upload" component={Upload} />
          <Route path="/trending" component={Trending} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
