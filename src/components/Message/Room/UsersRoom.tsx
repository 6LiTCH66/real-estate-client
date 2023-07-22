import React, {FC, useEffect, useState} from 'react';
import "./room.scss"
import {truncate} from "lodash";
import {useParams, useNavigate} from "react-router-dom";
import {useSocket} from "../../../contexts/SocketContext";
import {MessageProps, RoomData} from "../../../pages/Messages/Messages";
import message from "../Message";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {getUnreadMessage, readMessage} from "../../../http/chatAPI";


interface RoomComponentProps{
    _id: string,
    email: string,
    lastMessage: MessageProps,
    usersRooms?: RoomData

}
export interface UnreadMessagesCount{
    unreadCount: number,
}


const UsersRoom:FC<RoomComponentProps> = ({email,lastMessage: lastMessageDB,usersRooms, _id}) => {
    const {socket} = useSocket();
    const [lastMessage, setLastMessage] = useState<string>("")
    const [unreadMessageCount, setUnreadMessageCount] = useState<number>(1)
    const params = useParams();
    const navigate = useNavigate();

    const { isAuth,currentUser } = useSelector(
        (state: RootState) => state.userSlice
    );

    useEffect(() => {
        getUnreadMessage(lastMessageDB.room).then((messages) => {
            setUnreadMessageCount(messages.unreadCount)
        })
    }, [lastMessageDB]);


    useEffect(() => {

        if (socket){
            socket.on(_id, (data: MessageProps) => {
                setLastMessage(data.content)

                getUnreadMessage(lastMessageDB.room).then((messages) => {
                    setUnreadMessageCount(messages.unreadCount)
                })


            })

            socket.on("readMessage", () => {
                getUnreadMessage(lastMessageDB.room).then((messages) => {
                    setUnreadMessageCount(messages.unreadCount)
                })
            })

        }


    }, [socket]);



    const openChatRoom = () => {
        navigate(`/messages/${_id}`)
    }


    return (
        <div
            className=
                {`active-message ${params.room_id === _id ? "active" : "" } ${lastMessageDB.readBy?.includes(currentUser._id || "") ? "" : "not-read"}`}

            onClick={openChatRoom}>
            <div className="picture">
                <span>
                    {email.slice(0, 2)}
                </span>
            </div>
            <div className="active-message-info">
                        <span className="user-email">
                            {truncate(email, {length: 27})}
                        </span>
                <span className={`user-message ${(lastMessageDB.readBy?.length || 0) < 2 ? "not-read-other" : ""}`}>
                    {truncate(!lastMessage ? lastMessageDB.content : lastMessage, {length: 63})}

                    {unreadMessageCount >= 1 ? (
                        <span className="count-unread">{unreadMessageCount}</span>

                    ): (
                        <></>
                    )}
                </span>
            </div>
        </div>
    );
}

export default UsersRoom;