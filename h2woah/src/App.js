import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"

//Components
import PrivateRoute from './components/PrivateRoute';
import HomePage from "./components/HomePage"
import Login from "./components/Login"
import Signup from './components/Signup';
import AddPlantForm from "./components/AddPlantForm"
import EditForm from "./components/EditForm"

//Contexts
import {HomeContext} from "./contexts/HomeContext"

const initialPlant = {
  nickname: "",
  species: "",
  h2oFrequency: "",
  image: ""
}

function App() {
  const [plantList, setPlantList] = useState([])
  const [plant, setPlant] = useState(initialPlant)

  return (
    <Router>
      <div className="App">
        <HomeContext.Provider value={{plantList, setPlantList, plant, setPlant}}>
          <Route exact path ="/" component={Signup} />
          <Route exact path ="/login" component={Login} />
          <PrivateRoute exact path="/homepage" component={HomePage} />
          <Route path="/update-plant/:id" render={props=> <EditForm {...props} plantList={plantList} setPlantList={setPlantList} plant={plant} setPlant={setPlant}/>}/>
          <Route path="/add-plant" render={props=> <AddPlantForm {...props} plantList={plantList} setPlantList={setPlantList}/>}/>
        </HomeContext.Provider>
      </div>
    </Router>
  );
}

export default App;