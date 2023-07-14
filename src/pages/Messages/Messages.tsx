import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import "./messages.scss"
import {io} from "socket.io-client"
import Message from "../../components/Message/Message";
import {useId} from "react";
import {current} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {UserAuthentication} from "../../types/UserAuthentication";


interface MessageData{
    room: string,
    author: UserAuthentication,
    message: string,
    time: string
}

const socket = io("http://localhost:3000")

function Messages() {
    const [text, setText] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);
    const inputMessagesRef = useRef<HTMLDivElement>(null);
    const [messageList, setMessageList] = useState<MessageData[]>([]);

    const { isAuth,currentUser } = useSelector(
        (state: RootState) => state.userSlice
    );


    useEffect(() => {
        socket.emit("join_room", "11")

        return () => {
            socket.disconnect()
        }
    }, []);


    useEffect(() => {

        if (textAreaRef.current){
            textAreaRef.current.style.height = '24px';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // to set the height based on content

            if (inputMessagesRef.current && messagesRef.current){

                messagesRef.current.style.height = `calc(100% - ${inputMessagesRef.current.offsetHeight}px)`
            }
        }

    }, [text]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const sendMessage = async () => {
        if (text !== ""){

            const messageData: MessageData = {
                room: "11",
                author: currentUser,
                message: text,
                time: new Date(Date.now()).getHours() +":"+ new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
        }
        setText("")
    }


    useEffect(() => {
        socket.on("receive_message", (data: MessageData) => {
            console.log(data)
            setMessageList((list) => [...list, data])
        })


    }, [socket]);



    return (
        <div className="messenger">

            <div className="chat-rooms">
                <span>Your chat rooms will appear here</span>
            </div>
            <div className="messages">

                <div className="users-messages" ref={messagesRef}>
                    {messageList.map((message, index) => (
                        <Message
                            className={message.author === currentUser ? "you": "other"}
                            time={message.time}
                            author={message.author}
                            message={message.message}
                            key={index}
                        />

                    ))}

                </div>

                <div className="input-messages-container" ref={inputMessagesRef}>
                    <div className="text-area-container">

                       <textarea
                           className="messages-input"
                           ref={textAreaRef}
                           value={text}
                           placeholder={"Enter your message"}
                           onChange={handleChange}
                           onKeyPress={(event) => {
                               event.key === "Enter" && sendMessage()
                           } }
                       />

                    </div>


                    <button className="send-message-btn" onClick={sendMessage}>
                        Send
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Messages;