import React, {FC, useEffect, useRef} from 'react';
import "./message.scss";
import {UserAuthentication} from "../../types/UserAuthentication";

interface MessageProps{
    className: string,
    time: Date,
    author: UserAuthentication,
    message: string
}
const Message:FC<MessageProps> = ({className, time, author, message}) => {
    const messageRef = useRef<HTMLDivElement | null>(null);



    return (
        <div className={`message ${className}`} >
            <div>
                <p>{message}</p>
                <div className="message-meta">
                    <span id="time">{new Date(time).getHours() + ":" + new Date(time).getMinutes()}</span>
                    <span id="author">{author.first_name + " " + author.last_name}</span>
                </div>
            </div>

        </div>
    );
}

export default Message;