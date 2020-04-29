import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = ()=>{


return(
    <div>
        <div>
        <h2>h2Whoah</h2>
        <h3>use our app to water your plants</h3>
        </div>
        <div className='landing-buttons'>
            <Link to='/login'><button>Login</button></Link>
            <Link to='/register'><button>Sign Up</button></Link>
            <a href=''><button>Learn More</button></a>
        </div>
    </div>
)

    return
}