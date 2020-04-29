import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"

//Components
import PrivateRoute from './components/PrivateRoute';
import HomePage from "./components/HomePage"
import Login from "./components/Login"
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        {/* put components in here */}
        <Route exact path ="/signup" component={Signup} />
        <Route exact path ="/login" component={Login} />
        <PrivateRoute exact path="/homepage" component={HomePage} />
      </div>
    </Router>
  );
}

export default App;