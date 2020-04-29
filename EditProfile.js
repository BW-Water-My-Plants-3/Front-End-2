import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import axios from "axios"
import { axiosWithAuth } from "../utils/axiosWithAuth"

const initialUser = {
    id: "",
    username: "",
    phoneNumber: "",
    password: ""
}

const EditForm = () => {
    const [user, setUser] = useState(initialUser)
    // const {push} = useHistory()

    //useEffect for initial load for plant data--GET
    // useEffect(() => {
    //     axiosWithAuth()
    //         .get(``)
    //         .then(res => {
    //             console.log("GET profile RES", res)
    //         })
    //         .catch(err => {
    //             console.log("GET profile ERR", err)
    //         })
    // })

    //changeHandler
    const changeHandler = e => {
        e.persist()
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    //saveUser onSubmit-->PUT
    // const saveUser = e => {
    //     e.preventDefault()
    //     axiosWithAuth()
    //         .put(`/api/`, user) //WAITING FOR .PUT ENDPOINT FOR UPDATING user
    //         .then(res => {
    //             console.log("UPDATE user RES", res)
    //         })
    //         .catch(err => {
    //             console.log("UPDATE user ERR", err)
    //         })
    // }

    return(
        <>
        <h2>Edit Profile</h2>
            <p>Fill out the updated information</p>
            <div className="form">
                <form /*ADD ONSUBMIT SAVEUSER */> 
                    <label htmlFor="username">Username: &nbsp;
                        <input 
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={changeHandler}
                        /></label> &nbsp;
                     <label htmlFor="phoneNumber">PhoneNumber: &nbsp;
                        <input 
                        id="phoneNumber"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={changeHandler}
                        /></label> &nbsp;
                    <label htmlFor="password">Password: &nbsp;
                        <input 
                        type="password"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={changeHandler}
                        /></label> &nbsp;
                    <button>Save</button>
                </form>
            </div>
        </>
    )
}

export default EditForm