import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import { axiosWithAuth } from "../utils/axiosWithAuth"

const initialPlant = {
    id: "",
    nickname: "",
    species: "",
    h2oFrequency: "",
    imageURL: ""
}

//props brought in: plantList

const AddPlantForm = ({plantList}) => {
    const [plant, setPlant] = useState(initialPlant)
    const {push} = useHistory()

    //changeHandler
    const changeHandler = e => {
        e.persist()
        setPlant({
            ...plant, 
            [e.target.name]: e.target.value
        })
    }

    //addNewPlant onSubmit-->POST
    const addNewPlant = e => {
        e.preventDefault()
        axiosWithAuth()
        .post("/api/plants", plantList)
        .then(res => {
            console.log({res})
        })
        .catch(err => {
            console.log({err})
        })
    }

    return(
        <>
        <h2>Add Plant</h2>
            <p>Fill out the updated information</p>
            <div className="form">
                <form onSubmit={addNewPlant}> 
                    <label htmlFor="nickname">Nickname: &nbsp;
                        <input 
                        id="nickname"
                        name="nickname"
                        value={plant.nickname}
                        onChange={changeHandler}
                        /></label> &nbsp;
                     <label htmlFor="species">Species: (optional) &nbsp;
                        <input 
                        id="species"
                        name="species"
                        value={plant.species}
                        onChange={changeHandler}
                        /></label> &nbsp;
                    <label htmlFor="h2oFrequency">Water Frequency: &nbsp;
                        <select id="h2oFrequency" name="h2oFrequency">
                            <option value="low" >Once a month</option>
                            <option value="medium" >Once a week</option>
                            <option value="medium-high" >Once a day</option>
                            <option value="high" >Twice a day</option>
                        </select></label>&nbsp;
                    <label htmlFor="imageURL">Image URL: &nbsp;
                        <input 
                        type="string"
                        id="imageURL"
                        name="imageURL"
                        value={plant.imageURL}
                        onChange={changeHandler}
                        /></label> &nbsp;
                    <button>Add</button>
                </form>
            </div>
        </>
    )
}

export default AddPlantForm