import React, {FormEvent, useState} from 'react';
import "../authentication.scss"
import {UserAuthentication} from "../../../types/UserAuthentication";
import {login} from "../../../http/userAPI";
import toast from 'react-hot-toast';
import {useDispatch} from "react-redux";
import {toggleModal} from "../../../store/modalSlice";
import store from "../../../store/store";
import {setUser} from "../../../store/userSlice";

function Login() {
    const [userCredentials, setUserCredentials] = useState<UserAuthentication>({email: "", password: ""})
    const dispatch = useDispatch()
    const [logging, setLogging] = useState<boolean>(false);
    const handleUserForm = async (event: FormEvent) => {
        event.preventDefault()
        setLogging(true)


        toast.promise(
            login(userCredentials).then((user) => {

                localStorage.setItem("user", JSON.stringify(user))

                dispatch(setUser(user))
                dispatch(toggleModal())
                setUserCredentials({email: "", password: ""})
                setLogging(false)

            }),
            {
                loading: 'Signing in...',
                success: "Congratulations! You have successfully signed in to your account.",
                error: "Sorry, we were unable to sign you in. Please check your username and password and try again.",

            },
            {
                position: 'top-center',
            }
        ).catch(() => {
            setLogging(false)
        });


    }

    return (
        <div className="tab-container">
            <form onSubmit={handleUserForm}>
                <label htmlFor="login-email">Email</label>
                <input type="email" value={userCredentials.email} id='login-email' required={true} onChange={(event) => setUserCredentials({...userCredentials, email: event.target.value})} placeholder="Enter email"/>

                <label htmlFor="login-password">Password</label>
                <input type="password" value={userCredentials.password} required={true} id="login-password" onChange={(event) => setUserCredentials({...userCredentials, password: event.target.value})} placeholder="Enter password"/>
                <button type="submit" disabled={logging} className="submit-form">Submit</button>
            </form>

        </div>
    );
}

export default Login;