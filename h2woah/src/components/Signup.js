import React, {useState, useEffect} from 'react';
import * as Yup from "yup";
import axios from "axios"
import { Link } from 'react-router-dom';
//Styles
import styled from "styled-components"
import img from "../images/palmleaves.jpg"

const TestStyle = styled.body`
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
const Form = styled.div`
    border: 1px solid #F1F3F2;
    display: flex;
    flex-direction: column;
    jusity-content: center;
    align-items: center;
    width: 40%;
    height: 65%;
    background-color: #C9CFCA;
    border-radius: 5px;
    padding: 3% 0;
    opacity: 95%;

`
const Button = styled.button`
    border: 1px solid #303631;
    border-radius: 5px;
    background-color: #97AD4B;
    color: #F1F3F2;
    outline: none;

    &:hover{
        background-color: #F1F3F2;
        color: #97AD4B;
        border: 1px solid #79867C;
    }
`

const formSchema = Yup.object().shape({
username: 
    Yup
    .string()
    .required('Please enter your username'),

    phoneNumber: 
    Yup
    .string()
    .required('Please enter your number')
    .length(10,'Please enter a VALID phone number in the following format 1234567890'),

    password: 
    Yup
    .string()
    
    .required('Please create a password')
    .min(6, "Your password must be 6 characters long")
    
})

const Signup = props =>{
    const [formState, setFormState] = useState({
        username: "",
        phoneNumber: "",
        password: ""
        
    })
   
    const [errors, setErrors] = useState({
        username: "",
        phoneNumber: "",
        password: ""
        
    })
  
    const [buttonDisabled, setButtonDisabled] = useState(true);

    
    const [post, setPost] = useState([]);
    const [users, setUsers] = useState ([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    const validateChange = event => {
        Yup.reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [event.target.name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [event.target.name]: err.errors[0]
                });
            })
    };

    const inputChange = event => {
        event.persist();
        const newFormData = {
            ...formState,
            [event.target.name]:
                event.target.type === "checkbox" ? event.target.checked : event.target.value
        };
        validateChange(event);
        setFormState(newFormData);
    };

    const formSubmit = event => {
        event.preventDefault();
        axios.post("https://h2omyplants.herokuapp.com/api/signup", formState)
            .then(res => {
                setPost(res.data);
                console.log("success", res.data);
                setUsers([...users, res.data])
                setFormState({
                    username: "",
                    phoneNumber: "",
                    password: "",
                });
            })
            .catch(err => {
                console.log(err.res);
            });
    };

    return (
        <TestStyle>
                <Form onSubmit={formSubmit} id="signUpForm">
                    <h2>Let's get started!</h2>
                    <p>Create your account</p>
                    <label htmlFor="username">
                        Username <br/>
                    <input id="username" type="text" name="username" value={formState.username} onChange={inputChange} />
                    {errors.username.length > 0 ? (<p>{errors.name}</p>):null}
                    </label> <br/>
                    <label htmlFor="phoneNumber">
                        Phone <br/>
                    <input id="phoneNumber" type="phoneNumber" name="phoneNumber" value={formState.phoneNumber} onChange={inputChange} />
                    {errors.phoneNumber.length > 0 ? (<p className="error"> {errors.phoneNumber}</p>) : null}
                    </label><br/>
                    <label htmlFor="password">
                        Password <br/>
                    <input id="password" type="password" name="password" value={formState.password} onChange={inputChange} />
                    {errors.password.length > 0 ? (<p>{errors.password}</p>):null}
                    </label><br/>
                    
                    <Button disabled={buttonDisabled} className="navButton">Submit</Button>
                    <p className="success-message">{users.map(element => {
                        console.log({element})
                        return (
                        <div>Success: {element.message}! Go to <Link onClick={() => props.history.push("/login")}>Login</Link></div>
                        );
                    })}</p><br/>
                    <p>Already have an Account? <Link to='/login'>Login</Link> here!</p>
                </Form>
                    
        </TestStyle>

    );
}



export default Signup