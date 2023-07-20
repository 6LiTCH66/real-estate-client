import React, {FC, useEffect, useState} from 'react';
import './ContactForm.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {toggleModal} from "../../store/modalSlice";
import {createRoom} from "../../http/chatAPI";
import {first} from "lodash";

export interface ContactFormProps{
    agentId?: string;
}
interface ContactFromUserInfo{
    first_name?: string,
    last_name?: string,
    phone?: string
}
export interface Chat extends ContactFromUserInfo{
    agentId: string,
    message: string,

}

const ContactForm:FC<ContactFormProps> = ({agentId}) => {
    const [message, setMessage] = useState<string>("");
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState<ContactFromUserInfo>({})


    const { isAuth,currentUser } = useSelector(
        (state: RootState) => state.userSlice

    );

    const sendMessage = async () => {
        if (!isAuth){
            dispatch(toggleModal())
            return;
        }

        if (agentId){
            const newChatData: Chat = {
                agentId: agentId,
                message: message,
                ...(Object.keys(userInfo).length && userInfo)
            }

            const messageRes = await createRoom(newChatData)

            console.log(messageRes)
        }

    }


    return (
        <div className="contact-form">
            <div className="contact-form-container">
                <h5>Contact us</h5>

                <form className="contact-form_inputs" onSubmit={(event) => event.preventDefault()}>
                    <div className="input-container">
                        <label htmlFor="firstName">Full name</label>
                        <input
                            required={true}
                            type="text"
                            id="firstName"
                            defaultValue={currentUser.first_name && currentUser.first_name}
                            onChange={(event) => {
                                setUserInfo({...userInfo, first_name: event.target.value})
                            }}
                            placeholder="Your first name"/>
                    </div>

                    <div className="input-container">
                        <label htmlFor="lastName">Last name</label>
                        <input
                            required={true}
                            type="text"
                            id="lastName"
                            defaultValue={currentUser.last_name &&  currentUser.last_name }
                            onChange={(event) => {
                                setUserInfo({...userInfo, last_name: event.target.value})
                            }}
                            placeholder="Your last name"/>
                    </div>

                    <div className="input-container">
                        <label htmlFor="phoneNumber">Phone number</label>
                        <input
                            required={true}
                            type="tel"
                            id="phoneNumber"
                            defaultValue={currentUser && currentUser.phone}
                            onChange={(event) => {
                                setUserInfo({...userInfo, phone: event.target.value})
                            }}
                            placeholder="Phone number"/>
                    </div>

                    <div className="input-container">
                        <label htmlFor="email">E-mail</label>
                        <input
                            required={true}
                            type="email"
                            id="email"
                            defaultValue={currentUser && currentUser.email}

                            placeholder="E-mail"/>
                    </div>

                    <div className="input-container">
                        <label htmlFor="yourMessage">Your Message</label>
                        <textarea
                            required={true}
                            name="yourMessage"
                            id="yourMessage"
                            placeholder="Your Message"
                            onChange={(event) => setMessage(event.target.value)}
                        >

                        </textarea>
                    </div>

                    <div className="input-check">
                        <input type="checkbox" id="agree"/>
                        <label htmlFor="agree">I agree to the processing of personal data.</label>
                    </div>


                    <button className="form-send_button" type={isAuth ? "submit": "button"} onClick={sendMessage}>
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ContactForm;