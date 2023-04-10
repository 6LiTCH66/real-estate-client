import React, {useState} from 'react';
import "./authentication.scss"
interface isActive{
    loginBtn: boolean,
    signupBtn: boolean,
}
function Authentication() {

    const [isActive, setIsActive] = useState<isActive>({loginBtn: true, signupBtn: false})


    return (
        <div className="authentication">
            <div className="modal-container">
                <h2 className="auth-title">Welcome to Real Estate</h2>

                <div className="tab-list">
                    <button type="button"
                            className={ isActive.loginBtn ? "isActive" : ""}
                            onClick={() => setIsActive({signupBtn: false, loginBtn: true})}>

                        Sign in
                    </button>
                    <button type="button"
                            className={ isActive.signupBtn ? "isActive" : ""}
                            onClick={() => setIsActive({loginBtn: false, signupBtn: true})}>
                        New Account</button>
                </div>

                <div className="login-tab-container">

                    <label htmlFor="login-email">Email</label>
                    <input type="text" id='login-email' placeholder="Enter email"/>

                    <label htmlFor="login-password">Password</label>
                    <input type="password" id="login-password" placeholder="Enter password"/>
                    <button type="button" className="submit-form">Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Authentication;