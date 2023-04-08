import React from 'react';
import './ContactForm.scss'

function ContactForm() {
    return (
        <div className="contact-form">
            <div className="contact-form-container">
                <h5>Contact us</h5>

                <div className="contact-form_inputs">
                    <div className="input-container">
                        <label htmlFor="fullName">Full name</label>
                        <input type="text" id="fullName" placeholder="Your full name"/>
                    </div>

                    <div className="input-container">
                        <label htmlFor="phoneNumber">Phone number</label>
                        <input type="tel" id="phoneNumber" placeholder="Phone number"/>
                    </div>

                    <div className="input-container">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" placeholder="E-mail"/>
                    </div>

                    <div className="input-container">
                        <label htmlFor="yourMessage">Your Message</label>
                        <textarea name="yourMessage" id="yourMessage" placeholder="Your Message">

                        </textarea>
                    </div>

                    <div className="input-check">
                        <input type="checkbox" id="agree"/>
                        <label htmlFor="agree">I agree to the processing of personal data.</label>
                    </div>


                    <button className="form-send_button" type="button">
                        Send Message
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;