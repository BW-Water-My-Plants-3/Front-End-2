import React from "react"
import {axiosWithAuth} from "../utils/axiosWithAuth"
import {Link} from "react-router-dom"
//Styles
import styled from "styled-components"
import img from "../images/palmleaves.jpg"

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
    margin-bottom: 31.5%;

    &:hover{
        background-color: #F1F3F2;
        color: #97AD4B;
        border: 1px solid #79867C;
    }
`
const Input = styled.input`
    outline: none;
    border-radius: 3px;
`

class Login extends React.Component{
    state = {
        credentials: {
            username: "",
            password: ""
        }
    }

    handleChange = e => {
        this.setState({
            credentials:{
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        })
    }

    login = e => {
        e.preventDefault()
        axiosWithAuth()
            .post("/api/login", this.state.credentials)
            .then(res => {
                console.log({res})
                localStorage.setItem('token', JSON.stringify(res.data.token))
                this.props.history.push("/homepage")
            })
            .catch(err => {
                console.log({err})
            })
    }

    render(){
        return(
        <TestStyle>
            {/* <div className="login form"> */}
                <Form onSubmit={this.login}> 
                    <h2>Welcome Back!</h2>
                    <p>Log into your account</p>
                    <label htmlFor="username">Username <br/>
                        <Input 
                        id="username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        /></label> <br/>
                    <label htmlFor="password">Password <br/>
                        <Input 
                        type="password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        /></label><br/>
                    <StyledButton>Log in</StyledButton><br />
                    <p>Don't have an Account? <Link to='/'>Sign Up</Link> here!</p>
                </Form>
            {/* </div> */}
        </TestStyle>
        )
    }
}

export default Login