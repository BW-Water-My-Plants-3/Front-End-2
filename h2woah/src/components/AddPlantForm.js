import React, {useState, useEffect} from "react"
import { useHistory } from "react-router-dom"
import { axiosWithAuth } from "../utils/axiosWithAuth"

const AddPlantForm = ({plantList, setPlantList, plant, setPlant}) => {
    const {push} = useHistory()
    console.log({plant})

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
        .post("/api/plants", plant)
        .then(res => {
            setPlantList(plantList)
            push("/homepage")
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
                     <label htmlFor="species">Species: &nbsp;
                        <input 
                        id="species"
                        name="species"
                        value={plant.species}
                        onChange={changeHandler}
                        /></label> &nbsp;
                    <label htmlFor="h2oFrequency">Water Frequency: &nbsp;
                        <select id="h2oFrequency" name="h2oFrequency" onChange={changeHandler}>
                            <option value="Once a month" >Once a month</option>
                            <option value="Once a week" >Once a week</option>
                            <option value="Once a day" >Once a day</option>
                            <option value="Twice a day" >Twice a day</option>
                        </select></label>&nbsp;
                    <label htmlFor="image">Image: &nbsp;
                        <input 
                        type="string"
                        id="image"
                        name="image"
                        value={plant.image}
                        onChange={changeHandler}
                        /></label> &nbsp;
                    <button>Add</button>
                </form>
            </div>
        </>
    )
}

export default AddPlantForm