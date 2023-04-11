import React from 'react';
import "../authentication.scss"
function Login() {
    return (
        <div className="tab-container">

            <label htmlFor="login-email">Email</label>
            <input type="text" id='login-email' placeholder="Enter email"/>

            <label htmlFor="login-password">Password</label>
            <input type="password" id="login-password" placeholder="Enter password"/>
            <button type="button" className="submit-form">Submit</button>
        </div>
    );
}

export default Login;