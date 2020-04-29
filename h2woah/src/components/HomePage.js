import React, {useState} from "react"
import {useHistory, Route} from "react-router-dom"

//Components
import AddPlantForm from "../components/AddPlantForm"
import EditForm from "../components/EditForm"
import EditProfile from "../components/EditProfile"

const HomePage = () => {
    const [plantList, setPlantList] = useState()
    const {push} = useHistory()
    return(
        <>
            <Route path="/update-plant/:id" render={props => <EditForm {...props} plantList={plantList}/>} />
            <Route path="/update-profile/:id" component={EditProfile}/>
            <Route path="/add-plant" component={AddPlantForm}/>
            {/* add onClick function to go to Edit PLANT form */}
            {/* add onClick function to go to Edit PROFILE form */}
            <button onClick={() => push("/add-plant")}>Add Plant</button>
        </>
    )
}

export default HomePage