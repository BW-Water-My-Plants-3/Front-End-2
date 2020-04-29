import React,{useState,useEffect} from 'react';
import * as Yup from "yup";
import axios from "axios"

const formSchema = Yup.object().shape({
userName: 
    Yup
    .string()
    .required('Please enter your name'),

    phone: 
    Yup
    .string()
    .required('Please enter your phone number')
    .length(10,'Please enter a VALID phone number in the following format 1234567890'),

    password: 
    Yup
    .string()
    
    .required('Please create a password')
    .min(6, "Your password must be 6 characters long")
    
})

const Signup = props =>{

    const [formState, setFormState] = useState({
        userName: "",
        phone: "",
        password: ""
        
    })
   
    const [errors, setErrors] = useState({
        userName: "",
        phone: "",
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
                console.log("success", post);
                setUsers([...users, res.data])
                setFormState({
                    name: "",
                    phone: "",
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
                <label htmlFor="userName">
                    Name
                <input id="userName" type="text" name="userName" value={formState.userName} onChange={inputChange} />
                {errors.userName.length > 0 ? (<p>{errors.name}</p>):null}
                </label>
                <label htmlFor="phone">
                    Phone
                <input id="phone" type="phone" name="phone" value={formState.phone} onChange={inputChange} />
                {errors.phone.length > 0 ? (<p className="error"> {errors.phone}</p>) : null}
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
            <div>
                <h1>Users</h1>
                {users.map(element => {
                    return (
                        <div>Name: {element.userName} Email: {element.email}</div>
                    );
                })}
            </div>
        </div>
    );
}



export default Signup