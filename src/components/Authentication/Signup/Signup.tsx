import React, {FormEvent, useState} from 'react';
import "../authentication.scss"
import {UserAuthentication} from "../../../types/UserAuthentication";
import {signup} from "../../../http/userAPI";
import toast from 'react-hot-toast';

function Signup() {
    const [showAgentInfo, setShowAgentInfo] = useState<boolean>(false)
    const [userCredentials, setUserCredentials] = useState<UserAuthentication>({email: "", password: ""})
    const [signing, setSigning] = useState<boolean>(false)
    const handleSingupForm = async (event: FormEvent) => {
        event.preventDefault()

        setSigning(true)
        toast.promise(
            signup(userCredentials).then(() => {

                setUserCredentials({email: "", password: "", first_name: "", last_name: "", phone_number: ""})
                setSigning(false)


            }),
            {
                loading: 'Signing up...',
                success: "Congratulations! Your sign-up was successful. Welcome to our community!",
                error: "Sorry, we couldn't sign you up at this time. Please check that all fields are filled out correctly and try again.",
            },
            {
                position: "top-center",
                duration: 4000
            }
        ).catch(() => {
            setSigning(false)

        });


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


                <button type="submit" disabled={signing} className="submit-form">Submit</button>
            </form>

        </div>
    );
}

export default Signup;