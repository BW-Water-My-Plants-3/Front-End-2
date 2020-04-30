import React from "react"
import {axiosWithAuth} from "../utils/axiosWithAuth"
import {Link} from "react-router-dom"
import "../index.css"

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
        <>
        <div id="loginForm">
            <h2>Welcome Back!</h2>
            <p>Log into your account</p>
            <div className="login form">
                <form onSubmit={this.login}> 
                    <label htmlFor="username">Username: &nbsp;
                        <input 
                        id="username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        /></label> &nbsp;
                    <label htmlFor="password">Password: &nbsp;
                        <input 
                        type="password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        /></label>&nbsp;
                    <button>Log in</button>
                </form>
                <p>Don't have an Account? <Link to='/'>Sign Up</Link> here!</p>
            </div>
        </div>
        </>
        )
    }
}

export default Login