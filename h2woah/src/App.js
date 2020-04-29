import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"

//Components
import PrivateRoute from './components/PrivateRoute';
import HomePage from "./components/HomePage"
import Login from "./components/Login"
import Signup from './components/Signup';
import AddPlantForm from "./components/AddPlantForm"

function App() {
  const [plantList, setPlantList] = useState({
    plant: {
      id: "",
      nickname: "",
      species: "",
      h2oFrequency: "",
      imageURL: ""
    }
  })

  return (
    <Router>
      <div className="App">
        {/* put components in here */}
        <Route exact path ="/signup" component={Signup} />
        <Route exact path ="/login" component={Login} />
        <Route path="/add-plant" render={props => <AddPlantForm {...props} plantList={plantList}/>}/>
        <PrivateRoute exact path="/homepage" component={HomePage} />
      </div>
    </Router>
  );
}

export default App;