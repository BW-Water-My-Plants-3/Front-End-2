import React, {useState} from "react"
import { useHistory } from "react-router-dom"
import { axiosWithAuth } from "../utils/axiosWithAuth"
import "../index.css"

const AddPlantForm = ({plantList, setPlantList}) => {
    const {push} = useHistory()
    const [plant, setPlant] = useState({
        nickname: "",
        species: "",
        h2oFrequency: "Once a month",
    })
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
        <h2 id="homecar">Add Plant</h2>
            <p class="card">Fill out your plant's information</p>
            <div className="card">

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
                    <button onClick={()=> push("/homepage")}>Cancel</button>
                </form>
            </div>
        </>
    )
}

export default AddPlantForm