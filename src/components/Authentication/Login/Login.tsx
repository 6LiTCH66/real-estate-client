import React, {FormEvent, useState} from 'react';
import "../authentication.scss"
import {UserAuthentication} from "../../../types/UserAuthentication";
import {login} from "../../../http/userAPI";

function Login() {
    const [userCredentials, setUserCredentials] = useState<UserAuthentication>({email: "", password: ""})
    // const user = useSelector((state: RootState) => state.userSlice.currentUser)
    const handleUserForm = async (event: FormEvent) => {
        event.preventDefault()

        await login(userCredentials)
        setUserCredentials({email: "", password: ""})

    }

    return (
        <div className="tab-container">
            <form onSubmit={handleUserForm}>
                <label htmlFor="login-email">Email</label>
                <input type="email" value={userCredentials.email} id='login-email' required={true} onChange={(event) => setUserCredentials({...userCredentials, email: event.target.value})} placeholder="Enter email"/>

                <label htmlFor="login-password">Password</label>
                <input type="password" value={userCredentials.password} required={true} id="login-password" onChange={(event) => setUserCredentials({...userCredentials, password: event.target.value})} placeholder="Enter password"/>
                <button type="submit" className="submit-form">Submit</button>
            </form>

        </div>
    );
}

export default Login;