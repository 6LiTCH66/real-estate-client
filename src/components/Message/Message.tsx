import React, {FC} from 'react';
import "./message.scss";
import {UserAuthentication} from "../../types/UserAuthentication";

interface MessageProps{
    className: string,
    time: string,
    author: UserAuthentication,
    message: string
}
const Message:FC<MessageProps> = ({className, time, author, message}) => {
    return (
        <div className={`message ${className}`}>
            <div>
                <p>{message}</p>
                <div className="message-meta">
                    <span id="time">{time}</span>
                    <span id="author">{author.email}</span>
                </div>
            </div>

        </div>
    );
}

export default Message;