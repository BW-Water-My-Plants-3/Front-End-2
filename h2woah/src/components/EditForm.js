import React, {useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import { axiosWithAuth } from "../utils/axiosWithAuth"


const EditForm = ({plant, setPlant}) => {
    const {push} = useHistory()
    const {id} = useParams()

    //useEffect for initial load for plant data--GET
    useEffect(() => {
        axiosWithAuth()
            .get(`/api/plants/${id}`)
            .then(res => {
                setPlant(res.data)
            })
            .catch(err => {
                console.log("GET ERR", err)
            })
    }, [id])

    //changeHandler
    const changeHandler = e => {
        e.preventDefault()
        setPlant({
            ...plant,
            [e.target.name]: e.target.value
        })
    }

    //saveItem onSubmit-->PUT
    const saveItem = e => {
        e.preventDefault()
        axiosWithAuth()
            .put(`/api/plants/${id}`, plant)
            .then(res => {
                setPlant(plant)
                push(`/homepage`)
            })
            .catch(err => {
                console.log("UPDATE PLANT ERR", err)
            })
    }

    const deletePlant = e => {
        e.preventDefault()
        axiosWithAuth()
            .delete(`/api/plants/${id}`)
            .then(res => {
                setPlant(plant)
                push(`/homepage`)
            })
            .catch(err => {
                console.log("DELETE ERR", err)
            })
    }

    return(
        <>
        <h2>Edit Plant</h2>
            <p>Fill out the updated information</p>
            <div className="form">
                <form onSubmit={saveItem}> 
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
                            <option value="Once a month" >Once a month</option>
                            <option value="Once a week" >Once a week</option>
                            <option value="Once a day" >Once a day</option>
                            <option value="Twice a day" >Twice a day</option>
                        </select>
                    </label> &nbsp;
                    <label htmlFor="image">Image URL: &nbsp;
                        <input 
                        type="string"
                        id="image"
                        name="image"
                        value={plant.image}
                        onChange={changeHandler}
                        /></label> &nbsp;
                    <button>Save</button>
                    <button onClick={deletePlant}>Delete</button>
                </form>
            </div>
        </>
    )
}

export default EditForm