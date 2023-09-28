import React, {useEffect, useId, useRef, useState} from 'react';
import "./chatRoom.scss";
import Message from "../Message";
import {UserAuthentication} from "../../../types/UserAuthentication";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {io} from "socket.io-client";
import {useParams} from "react-router-dom";
import {countUnreadMessage, getMessages, getRooms, readMessage} from "../../../http/chatAPI";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {MessageProps, Room, RoomData} from "../../../pages/Messages/Messages";
import {useSocket} from "../../../contexts/SocketContext";
import {useDispatch} from "react-redux";
import {setLastMessage} from "../../../store/chatSlice";
import {UnreadMessagesCount} from "../Room/UsersRoom";

interface JoinRoom{
    room_id: string,
    user_id: string
}


function ChatRoom() {
    const {socket} = useSocket();
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const [text, setText] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const messagesRef = useRef<HTMLDivElement>(null);
    const inputMessagesRef = useRef<HTMLDivElement>(null);
    const [messageList, setMessageList] = useState<MessageProps[]>([]);
    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    const {room_id} = useParams<{room_id: string}>();

    const {data: usersRoomData, isLoading, isError} = useQuery<Room>(["room", room_id], () => getMessages(room_id))

    // const {data: unreadMessagesNumber, isLoading: loadingCount, isError:errorCount} =
    //     useQuery<UnreadMessagesCount>("unreadMessagesCount", countUnreadMessage, {
    //         refetchOnWindowFocus: true
    //     })

    const { isAuth,currentUser } = useSelector(
        (state: RootState) => state.userSlice
    );

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const readMessageMutation = useMutation({
        mutationFn: readMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['last_message'] })
        },
    })



    useEffect(scrollToBottom, [messageList]);


    useEffect(() => {
        if (usersRoomData && !isLoading){
            setMessageList(usersRoomData.messages)

        }

    }, [usersRoomData]);



    useEffect(() => {
        if (socket){
            if (room_id && currentUser._id){

                const join_room_data: JoinRoom = {
                    room_id: room_id,
                    user_id: currentUser._id || ""
                }

                socket.emit("join_room", join_room_data)


            }
        }


    }, [room_id]);

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
        if (text !== "" && room_id && currentUser._id){

            const messageData: MessageProps = {
                readBy: [currentUser._id],
                room: room_id,
                user: currentUser,
                content: text

            }
            if (socket){

                socket.emit("send_message", messageData)

            }
            setMessageList((list) => [...list, messageData])
        }
        setText("")
    }


    useEffect(() => {
        if (socket){
            socket.on(`receive_message_${room_id}`, (data: MessageProps) => {
                setMessageList((list) => [...list, data])


                readMessageMutation.mutate(data.room)



            })
        }
        return () => {
            if (socket) {
                // Leave room
                socket.emit('leaveRoom', room_id);

                // Remove the listener
                socket.off(`receive_message_${room_id}`);
            }
        };


    }, [socket, room_id]);





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
                <div ref={messageEndRef}/>

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