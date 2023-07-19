import React, {useEffect, useId, useRef, useState} from 'react';
import "./chatRoom.scss";
import Message from "../Message";
import {UserAuthentication} from "../../../types/UserAuthentication";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {io} from "socket.io-client";
import {useParams} from "react-router-dom";
import {getMessages, getRooms} from "../../../http/chatAPI";
import {useQuery} from "react-query";
import {MessageProps, Room, RoomData} from "../../../pages/Messages/Messages";
interface MessageData{
    room: string,
    author: UserAuthentication,
    message: string,
    time: string
}

const socket = io("http://localhost:3000")
function ChatRoom() {
    const [text, setText] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);
    const inputMessagesRef = useRef<HTMLDivElement>(null);
    const [messageList, setMessageList] = useState<MessageProps[]>([]);

    const {room_id} = useParams<{room_id: string}>();

    const {data: usersRoomData, isLoading, isError} = useQuery<Room>(["room", room_id], () => getMessages(room_id))


    const { isAuth,currentUser } = useSelector(
        (state: RootState) => state.userSlice
    );

    useEffect(() => {
        if (usersRoomData){
            setMessageList(usersRoomData.messages)

        }

    }, [usersRoomData]);





    useEffect(() => {
        if (room_id){
            socket.emit("join_room", room_id)
        }

        return () => {
            socket.disconnect()
        }
    }, []);

    useEffect(() => {

        if (textAreaRef.current){
            textAreaRef.current.style.height = '24px';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;

            if (inputMessagesRef.current && messagesRef.current){

                messagesRef.current.style.height = `calc(100% - ${inputMessagesRef.current.offsetHeight}px)`
            }
        }

    }, [text]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const sendMessage = async () => {
        if (text !== "" && room_id){

            const messageData: MessageProps = {
                room: room_id,
                user: currentUser,
                content: text,

            }

            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
        }
        setText("")
    }


    useEffect(() => {
        socket.on("receive_message", (data: MessageProps) => {
            // console.log(data)
            setMessageList((list) => [...list, data])
        })


    }, [socket]);
    const id = useId();


    return (
        <div className="messages">

            <div className="users-messages" ref={messagesRef}>
                {messageList.map((message, index) => (
                    <Message
                        className={message.user._id === currentUser._id ? "you": "other"}
                        time={message.createdAt || new Date()}
                        author={message.user}
                        message={message.content}
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
    );
}

export default ChatRoom;