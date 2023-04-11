import React, {useState} from 'react';
import "../authentication.scss"
function Signup() {
    const [showAgentInfo, setShowAgentInfo] = useState<boolean>(false)

    return (
        <div className="tab-container">

            <label htmlFor="login-email">Email</label>
            <input type="text" id='login-email' placeholder="Enter email"/>

            <label htmlFor="login-password">Password</label>
            <input type="password" id="login-password" placeholder="Create password"/>

            <div className="checkbox-container">
                <input type="checkbox" id="landlord" onChange={() => setShowAgentInfo(prevState => !prevState)}/>
                <label htmlFor="landlord" >I am a landlord or industry professional</label>
            </div>

            <div className="landlord-info" style={{display: showAgentInfo ? "block" : "none"}}>
                <h3 className="landlord-title">Professional Information</h3>
                <div className="landlord-container">
                    <div className="name">
                        <label htmlFor="first-name">First name</label>
                        <input type="text" id="first-name" placeholder="First name"/>
                    </div>

                    <div className="last-name">
                        <label htmlFor="last-name">Last name</label>
                        <input type="text" id="last-name" placeholder="Last name"/>
                    </div>

                </div>


                <label htmlFor="tel">Phone number</label>
                <input type="tel" id="tel" placeholder="Phone number"/>


            </div>


            <button type="button" className="submit-form">Submit</button>
        </div>
    );
}

export default Signup;