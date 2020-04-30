import React, {useState, useContext, useEffect} from "react"
import {useHistory, Route} from "react-router-dom"

//Contexts
import {HomeContext} from "../contexts/HomeContext"
import { axiosWithAuth } from "../utils/axiosWithAuth"

const HomePage = () => {
    const {plantList, setPlantList} = useContext(HomeContext)
    const {push} = useHistory()

    console.log("MY PLANTLIST", plantList)

    useEffect(() => {
        axiosWithAuth()
            .get("/api/plants")
            .then(res => {
                console.log("useEffect res", res)
                setPlantList(res.data)
            })
            .catch(err => {
                console.log("useEffect err", err)
            })
    }, [])

    return(
        <>
            <header>
                <h2>Water My Plants</h2>
                <p>My Plants</p>
                <i className="fas fa-user"></i>
            </header>
            
            <div>
                <button onClick={() => push("/add-plant")}>Add Plant</button>
                <p>{plantList && plantList.map(showPlant => {
                    return(
                    <div className="card">
                        <p>Nickname: {showPlant.nickname}</p>
                        <p>Species: {showPlant.species}</p> 
                        <p>Water Me: {showPlant.h2oFrequency}</p>
                    </div>
                    )
                })}</p>
            </div>
        </>
    )
}

export default HomePage
