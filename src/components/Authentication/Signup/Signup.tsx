import React, {FormEvent, useState} from 'react';
import "../authentication.scss"
import {UserAuthentication} from "../../../types/UserAuthentication";
import axios from "axios";
import {signup} from "../../../http/userAPI";


function Signup() {
    const [showAgentInfo, setShowAgentInfo] = useState<boolean>(false)
    const [userCredentials, setUserCredentials] = useState<UserAuthentication>({email: "", password: ""})

    const handleSingupForm = async (event: FormEvent) => {
        event.preventDefault()

        await signup(userCredentials)

        setUserCredentials({email: "", password: "", first_name: "", last_name: "", phone_number: ""})


    }


    return (
        <div className="tab-container">
            <form onSubmit={handleSingupForm}>
                <label htmlFor="login-email">Email</label>
                <input type="email"
                       required={true}
                       id='login-email'
                       value={userCredentials.email}
                       onChange={(event) => setUserCredentials({...userCredentials, email: event.target.value})}
                       placeholder="Enter email"/>

                <label htmlFor="login-password">Password</label>
                <input type="password"
                       required={true}
                       id="login-password"
                       value={userCredentials.password}
                       onChange={(event) => setUserCredentials({...userCredentials, password: event.target.value})}
                       placeholder="Create password"/>


                <div className="checkbox-container">
                    <input type="checkbox" id="landlord" onChange={(event) => {
                        setShowAgentInfo(prevState => !prevState)
                        setUserCredentials({...userCredentials, isAgent: event.target.checked})
                    }}/>
                    <label htmlFor="landlord" >I am a landlord or industry professional</label>
                </div>

                <div className="landlord-info" style={{display: showAgentInfo ? "block" : "none"}}>
                    <h3 className="landlord-title">Professional Information</h3>
                    <div className="landlord-container">
                        <div className="name">
                            <label htmlFor="first-name">First name</label>

                            <input type="text"
                                   onChange={(event) => setUserCredentials({...userCredentials, first_name: event.target.value}) }
                                   required={showAgentInfo}
                                   id="first-name"
                                   value={userCredentials.first_name || ""}
                                   placeholder="First name"/>
                        </div>

                        <div className="last-name">
                            <label htmlFor="last-name">Last name</label>
                            <input type="text"

                                   onChange={(event) => setUserCredentials({...userCredentials, last_name: event.target.value})}
                                   required={showAgentInfo}
                                   id="last-name"
                                   value={userCredentials.last_name || ""}
                                   placeholder="Last name"/>
                        </div>

                    </div>


                    <label htmlFor="tel">Phone number</label>
                    <input type="tel"
                           onChange={(event) => setUserCredentials({...userCredentials, phone_number: event.target.value})}
                           required={showAgentInfo}
                           id="tel"
                           value={userCredentials.phone_number || ""}
                           placeholder="Phone number"/>


                </div>


                <button type="submit" className="submit-form">Submit</button>
            </form>

        </div>
    );
}

export default Signup;