import React, {FormEvent, useState} from 'react';
import "../authentication.scss"
import {UserAuthentication} from "../../../types/UserAuthentication";
import {signup} from "../../../http/userAPI";
import toast from 'react-hot-toast';
import InputField from "../../UI/InputField/InputField";

function Signup() {
    const [showAgentInfo, setShowAgentInfo] = useState<boolean>(false)
    const [userCredentials, setUserCredentials] = useState<UserAuthentication>({email: "", password: ""})
    const [signing, setSigning] = useState<boolean>(false)
    const handleSingupForm = async (event: FormEvent) => {
        event.preventDefault()

        setSigning(true)
        toast.promise(
            signup(userCredentials).then(() => {

                setUserCredentials({email: "", password: "", first_name: "", last_name: "", phone: ""})
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


                <InputField
                    id={"login-email"}
                    type={"email"}
                    value={userCredentials.email}
                    required={true}
                    onChange={(event) => setUserCredentials({...userCredentials, email: event.target.value})}
                    placeholder={"Enter email"}
                    label={

                        <label htmlFor="login-email">Email</label>
                    }/>


                <InputField
                    id={"login-password"}
                    type={"password"}
                    value={userCredentials.password}
                    required={true}
                    onChange={(event) => setUserCredentials({...userCredentials, password: event.target.value})}
                    placeholder={"Enter password"}
                    label={

                        <label htmlFor="login-password">Password</label>
                    }/>


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

                            <InputField
                                id={"first-name"}
                                type={"text"}
                                value={userCredentials.first_name || ""}
                                required={showAgentInfo}
                                onChange={(event) => setUserCredentials({...userCredentials, first_name: event.target.value}) }
                                placeholder={"First name"}
                                label={

                                    <label htmlFor="first-name">First name</label>
                                }/>
                        </div>

                        <div className="last-name">

                            <InputField
                                id={"last-name"}
                                type={"text"}
                                value={userCredentials.last_name || ""}
                                required={showAgentInfo}
                                onChange={(event) => setUserCredentials({...userCredentials, last_name: event.target.value}) }
                                placeholder={"Last name"}
                                label={

                                    <label htmlFor="last-name">Last name</label>
                                }/>
                        </div>

                    </div>


                    <InputField
                        id={"tel"}
                        type={"tel"}
                        value={userCredentials.phone || ""}
                        required={showAgentInfo}
                        onChange={(event) => setUserCredentials({...userCredentials, phone: event.target.value}) }
                        placeholder={"Phone number"}
                        label={

                            <label htmlFor="tel">Phone number</label>
                        }/>


                </div>


                <button type="submit" disabled={signing} className="submit-form">Submit</button>
            </form>

        </div>
    );
}

export default Signup;