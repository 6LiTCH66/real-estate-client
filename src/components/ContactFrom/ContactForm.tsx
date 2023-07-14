import React, {useEffect} from 'react';
import './ContactForm.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

function ContactForm() {

    const { isAuth,currentUser } = useSelector(
        (state: RootState) => state.userSlice
    );



    return (
        <div className="contact-form">
            <div className="contact-form-container">
                <h5>Contact us</h5>

                <form className="contact-form_inputs">
                    <div className="input-container">
                        <label htmlFor="fullName">Full name</label>
                        <input
                            required={true}
                            type="text"
                            id="fullName"
                            defaultValue={currentUser.first_name && (currentUser.first_name + " " + currentUser.last_name )}
                            placeholder="Your full name"/>
                    </div>

                    <div className="input-container">
                        <label htmlFor="phoneNumber">Phone number</label>
                        <input required={true} type="tel" id="phoneNumber" defaultValue={currentUser && currentUser.phone} placeholder="Phone number"/>
                    </div>

                    <div className="input-container">
                        <label htmlFor="email">E-mail</label>
                        <input required={true} type="email" id="email" defaultValue={currentUser && currentUser.email} placeholder="E-mail"/>
                    </div>

                    <div className="input-container">
                        <label htmlFor="yourMessage">Your Message</label>
                        <textarea required={true} name="yourMessage" id="yourMessage" placeholder="Your Message">

                        </textarea>
                    </div>

                    <div className="input-check">
                        <input type="checkbox" id="agree"/>
                        <label htmlFor="agree">I agree to the processing of personal data.</label>
                    </div>


                    <button className="form-send_button" type="submit">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ContactForm;