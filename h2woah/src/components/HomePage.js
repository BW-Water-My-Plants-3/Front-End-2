import React, {useContext, useEffect} from "react"
import {useHistory} from "react-router-dom"
//Contexts
import {HomeContext} from "../contexts/HomeContext"
import { axiosWithAuth } from "../utils/axiosWithAuth"
//Styles
import styled from "styled-components"
import logo from "../images/company-logo.png"

const TestStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-image: url("https://images.unsplash.com/photo-1485627941502-d2e6429a8af0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60");
    background-repeat: repeat-y;
    background-size: 100% 120vh;
    background-position: center;
    max-width: 100%;
    height: 100vh;
`
const MyHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
    background-color: #303631;
`
const Logo = styled.img`
    width: 150px;
    height: 150px;
`
const H2 = styled.h2`
    margin-right: 45%;
    margin-left: 1%;
    color: #F1F3F2;
    text-shadow: -2px -2px #97AD4B;
    font-size: 2.5rem;
`
const StyledButton = styled.button`
    border: 1px solid #303631;
    border-radius: 5px;
    background-color: #97AD4B;
    color: #F1F3F2;
    outline: none;
    height: 40px;
    font-size: large;

    &:hover{
        background-color: #F1F3F2;
        color: #97AD4B;
        border: 1px solid #79867C;
    }
`
const LogoutButton = styled.button`
    border: 1px solid #303631;
    border-radius: 5px;
    background-color: #303631;
    color: #F1F3F2;
    outline: none;
    height: 40px;
    font-size: large;
    margin-left: 2%;
    margin-right: 1%;

    &:hover{
        background-color: #F1F3F2;
        color: #303631;
        border: 1px solid #79867C;
    }
`
const CardHolder = styled.div`
    border: 3px solid green;    
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
`
const CardParent = styled.div`
    border: 2px solid red;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;   
    height: 100vh;
    padding: 0 4%; 

`
const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 20%;
    margin: 1%;
    background-color: #444A45;
    border-radius: 5px;
    border: 1px solid #c9cfca;
    color: #f1f3f2;
    padding: 1%;
    box-shadow: 4px 4px rgba(151, 173, 75, 0.75);
`
const ImageStyle = styled.img`
    height: 180px;
    border-radius: 5px;
    margin: 3% 0;
    padding: 5px;
    border: 1px solid #79867C;
    background-color: #F1F3F2;
    box-shadow: 1px 1px lightgrey;
`

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
        <TestStyle>
            <MyHeader>
                <Logo src={logo} alt="Water My Plants Logo"/>
                <H2>Water My Plants</H2>
                <StyledButton onClick={() => push("/add-plant")}>Add Plant</StyledButton>
                <LogoutButton onClick={() => push("/login")}>Log out</LogoutButton>
            </MyHeader>
            
            <CardHolder>
                <CardParent>{plantList && plantList.map(showPlant => {
                    if(showPlant.image === null || ""){
                        return (
                        <Card key={showPlant.plant}>
                            <ImageStyle src={"https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80"} alt="Potted green plant"/>
                            <p>Nickname: {showPlant.nickname}</p>
                            <p>Species: {showPlant.species}</p> 
                            <p>Water Me: {showPlant.h2oFrequency}</p>
                            <StyledButton onClick={() => push(`/update-plant/${showPlant.id}`)}>Update</StyledButton>
                        </Card>
                        )
                    }
                    return(
                    <Card key={showPlant.plant}>
                        <ImageStyle src={showPlant.image} alt={showPlant.species} />
                        <p>Nickname: {showPlant.nickname}</p>
                        <p>Species: {showPlant.species}</p> 
                        <p>Water Me: {showPlant.h2oFrequency}</p>
                        <StyledButton onClick={() => push(`/update-plant/${showPlant.id}`)}>Update</StyledButton>
                    </Card>
                    )
                })}</CardParent>
            </CardHolder>
        </TestStyle>
    )
}

export default HomePage
