import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import axios from "axios"

const initialPlant = {
    id: "",
    nickname: "",
    species: "",
    h2oFrequency: "",
    imageURL: ""
}

//changeHandler

//saveItem onSubmit-->POST


const AddPlantForm = () => {
    const [plant, setPlant] = useState(initialPlant)
    // const {push} = useHistory()

    return(
        <>
        <h2>Add Plant</h2>
            <p>Fill out the updated information</p>
            <div className="form">
                <form /*add onSubmit*/> 
                    <label htmlFor="nickname">Nickname: &nbsp;
                        <input 
                        id="nickname"
                        name="nickname"
                        value={plant.nickname}
                        onChange="" //add onChange event here
                        /></label> &nbsp;
                     <label htmlFor="species">Species: (optional) &nbsp;
                        <input 
                        id="species"
                        name="species"
                        value={plant.species}
                        onChange="" //add onChange event here
                        /></label> &nbsp;
                    <label htmlFor="h2oFrequency">
                        <select id="h2oFrequency" name="h2oFrequency">
                            <option value="low" >Once a month</option>
                            <option value="medium" >Once a week</option>
                            <option value="medium-high" >Once a day</option>
                            <option value="high" >Twice a day</option>
                        </select>
                        Water Frequency: &nbsp;</label>
                    <label htmlFor="imageURL">
                        <input 
                        type="string"
                        id="imageURL"
                        name="imageURL"
                        value={plant.imageURL}
                        onChange="" //add onChange event here
                        /></label> &nbsp;
                    <button>Add</button>
                </form>
            </div>
        </>
    )
}

export default AddPlantForm