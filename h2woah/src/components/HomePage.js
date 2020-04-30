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
                    console.log({showPlant})
                    if(showPlant.image === null || ""){
                        return (
                        <div className="card" key={showPlant.plant}>
                            <img src={"https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80"} alt="Potted green plant"/>
                            <p>Nickname: {showPlant.nickname}</p>
                            <p>Species: {showPlant.species}</p> 
                            <p>Water Me: {showPlant.h2oFrequency}</p>
                            <button onClick={() => push(`/update-plant/${showPlant.id}`)}>Update</button>
                        </div>
                        )
                    }
                    return(
                    <div className="card" key={showPlant.plant}>
                        <img src={showPlant.image} alt={showPlant.species} />
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
