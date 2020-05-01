import React, {useState} from "react"
import { useHistory } from "react-router-dom"
import { axiosWithAuth } from "../utils/axiosWithAuth"
//Styles
import styled from "styled-components"
import img from "../images/figtree.jpg"

const TestStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(${img});
    background-repeat: no-repeat;
    background-size: 100% 120vh;
    background-position: center;
    opacity: 60%;
    max-width: 100%;
    height: 100vh;
`
const Form = styled.form`
    border: 1px solid #F1F3F2;
    display: flex;
    flex-direction: column;
    jusity-content: center;
    align-items: center;
    width: 32%;
    height: 70%;
    background-color: #C9CFCA;
    border-radius: 5px;
    padding: 2% 0;
    opacity: 95%;

`
const StyledButton = styled.button`
    border: 1px solid #303631;
    border-radius: 5px;
    background-color: #97AD4B;
    color: #F1F3F2;
    outline: none;
    width: 35%;
    height: 40px;
    font-size: large;

    &:hover{
        background-color: #F1F3F2;
        color: #97AD4B;
        border: 1px solid #79867C;
    }
`
const CancelButton = styled.button`
    border: 1px solid #303631;
    border-radius: 5px;
    background-color: #303631;
    color: #F1F3F2;
    outline: none;
    height: 40px;
    font-size: large;

    &:hover{
        background-color: #F1F3F2;
        color: #303631;
        border: 1px solid #79867C;
    }
`
const Input = styled.input`
    outline: none;
    border-radius: 3px;
`
const Selector = styled.select`
    height: 27px;
`
const FlexDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 38%;
`

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
            <TestStyle className="card">
                <Form onSubmit={addNewPlant}> 
                    <h2 id="homecar">Add Plant</h2>
                    <p>Fill out your plant's information</p>
                    <label htmlFor="nickname">Nickname <br/>
                        <Input 
                        id="nickname"
                        name="nickname"
                        value={plant.nickname}
                        onChange={changeHandler}
                        /></label> <br/>
                     <label htmlFor="species">Species <br/>
                        <Input 
                        id="species"
                        name="species"
                        value={plant.species}
                        onChange={changeHandler}
                        /></label> <br/>
                    <label htmlFor="h2oFrequency">Water Frequency &nbsp;
                        <Selector id="h2oFrequency" name="h2oFrequency" onChange={changeHandler}>
                            <option value="Once a month" >Once a month</option>
                            <option value="Once a week" >Once a week</option>
                            <option value="Once a day" >Once a day</option>
                            <option value="Twice a day" >Twice a day</option>
                        </Selector></label><br/>
                    <label htmlFor="image">Image <br/>
                        <Input 
                        type="string"
                        id="image"
                        name="image"
                        value={plant.image}
                        onChange={changeHandler}
                        /></label> <br/>
                    <FlexDiv>
                        <StyledButton>Add</StyledButton>
                        <CancelButton onClick={()=> push("/homepage")}>Cancel</CancelButton>
                    </FlexDiv>
                </Form>
            </TestStyle>
        </>
    )
}

export default AddPlantForm