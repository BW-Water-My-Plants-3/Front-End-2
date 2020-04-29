import React, {useState, useEffect} from 'react';
import * as Yup from "yup";
import axios from "axios"

const formSchema = Yup.object().shape({
username: 
    Yup
    .string()
    .required('Please enter your username'),

    phoneNumber: 
    Yup
    .string()
    .required('Please enter your phoneNumber number')
    .length(10,'Please enter a VALID phoneNumber number in the following format 1234567890'),

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
                    name: "",
                    phoneNumber: "",
                    password: "",
                });
            })
            .catch(err => {
                console.log(err.res);
            });
    };

    return (
        <div id="form">

            <form onSubmit={formSubmit}>
                <label htmlFor="username">
                    Name
                <input id="username" type="text" name="username" value={formState.username} onChange={inputChange} />
                {errors.username.length > 0 ? (<p>{errors.name}</p>):null}
                </label>
                <label htmlFor="phoneNumber">
                    phoneNumber
                <input id="phoneNumber" type="phoneNumber" name="phoneNumber" value={formState.phoneNumber} onChange={inputChange} />
                {errors.phoneNumber.length > 0 ? (<p className="error"> {errors.phoneNumber}</p>) : null}
                </label>
                <label htmlFor="role">
                    Role
                </label>
                <label htmlFor="password">
                    Password
                <input id="password" type="password" name="password" value={formState.password} onChange={inputChange} />
                {errors.password.length > 0 ? (<p>{errors.password}</p>):null}
                </label>
                
                <button disabled={buttonDisabled}>Submit</button>
            </form>
            {/* <div>
                <h1>Users</h1>
                {users.map(element => {
                    return (
                        <div>Name: {element.username} Email: {element.email}</div>
                    );
                })}
            </div> */}
        </div>
    );
}



export default Signup