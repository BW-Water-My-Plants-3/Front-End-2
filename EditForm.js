import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import axios from "axios"
import { axiosWithAuth } from "../utils/axiosWithAuth"

const initialPlant = {
    id: "",
    nickname: "",
    species: "",
    h2oFrequency: "",
    imageURL: ""
}

const EditForm = () => {
    const [plant, setPlant] = useState(initialPlant)
    // const {push} = useHistory()

    //useEffect for initial load for plant data--GET
    // useEffect(() => {
    //     axiosWithAuth()
    //         .get(``)
    //         .then(res => {
    //             console.log("GET RES", res)
    //         })
    //         .catch(err => {
    //             console.log("GET ERR", err)
    //         })
    // })

    //changeHandler
    const changeHandler = e => {
        e.persist()
        setPlant({
            ...plant,
            [e.target.name]: e.target.value
        })
    }

    //saveItem onSubmit-->PUT
    // const saveItem = e => {
    //     e.preventDefault()
    //     axiosWithAuth()
    //         .put(`/api/`, plant) //WAITING FOR .PUT ENDPOINT FOR UPDATING PLANT
    //         .then(res => {
    //             console.log("UPDATE PLANT RES", res)
    //         })
    //         .catch(err => {
    //             console.log("UPDATE PLANT ERR", err)
    //         })
    // }

    return(
        <>
        <h2>Edit Plant</h2>
            <p>Fill out the updated information</p>
            <div className="form">
                <form /*ADD ONSUBMIT SAVEITEM */> 
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
                        </select>
                    </label> &nbsp;
                    <label htmlFor="imageURL">Image URL: &nbsp;
                        <input 
                        type="string"
                        id="imageURL"
                        name="imageURL"
                        value={plant.imageURL}
                        onChange={changeHandler}
                        /></label> &nbsp;
                    <button>Save</button>
                </form>
            </div>
        </>
    )
}

export default EditForm