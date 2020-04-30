import React, {useContext, useEffect} from "react"
import {useHistory} from "react-router-dom"

//Contexts
import {HomeContext} from "../contexts/HomeContext"
import { axiosWithAuth } from "../utils/axiosWithAuth"

const HomePage = () => {
    const {plantList, setPlantList} = useContext(HomeContext)
    const {push} = useHistory()


    useEffect(() => {
        axiosWithAuth()
            .get("/api/plants")
            .then(res => {
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
                {/* <i className="fas fa-user"></i> */}
                <button onClick={() => push("/login")}>Log out</button>
            </header>
            
            <div>
                <button onClick={() => push("/add-plant")}>Add Plant</button>
                <p>{plantList && plantList.map(showPlant => {
                    return(
                    <div className="card" key={showPlant.plant}>
                        <p>Nickname: {showPlant.nickname}</p>
                        <p>Species: {showPlant.species}</p> 
                        <p>Water Me: {showPlant.h2oFrequency}</p>
                        <button onClick={() => push(`/update-plant/${showPlant.id}`)}>Update</button>
                    </div>
                    )
                })}</p>
            </div>
        </>
    )
}

export default HomePage
