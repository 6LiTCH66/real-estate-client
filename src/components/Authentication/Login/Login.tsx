import React, {FormEvent, useState} from 'react';
import "../authentication.scss"
import {UserAuthentication} from "../../../types/UserAuthentication";
import {login} from "../../../http/userAPI";
import toast from 'react-hot-toast';
import {useDispatch} from "react-redux";
import {toggleModal} from "../../../store/modalSlice";

function Login() {
    const [userCredentials, setUserCredentials] = useState<UserAuthentication>({email: "", password: ""})
    const dispatch = useDispatch()
    const handleUserForm = async (event: FormEvent) => {
        event.preventDefault()

        await login(userCredentials).then(() => {
            dispatch(toggleModal())
            toast.success("You've been logged in successfully!")

        }).catch((err) => {
            toast.error("Something wrong while signing in!")
        })

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