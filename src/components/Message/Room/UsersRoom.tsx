import React, {FC, useEffect, useState, useMemo} from 'react';
import "./room.scss"
import {truncate} from "lodash";
import {useParams, useNavigate} from "react-router-dom";
import {useSocket} from "../../../contexts/SocketContext";
import {MessageProps, Room, RoomData} from "../../../pages/Messages/Messages";
import message from "../Message";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";
import {getLastMessage, getMessages, getUnreadMessage, readMessage} from "../../../http/chatAPI";
import {useQuery} from "react-query";


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
    const [lastMessage, setLastMessage] = useState<MessageProps>({} as MessageProps)
    const [unreadMessageCount, setUnreadMessageCount] = useState<number>(1)
    const params = useParams();
    const navigate = useNavigate();

    const {data: lastMessageRoom, isLoading, isError} =
        useQuery<MessageProps>(
            ["last_message", _id], () => getLastMessage(_id),
            {
            refetchOnWindowFocus: true
        })


    const { isAuth,currentUser } = useSelector(
        (state: RootState) => state.userSlice
    );

    useEffect(() => {
        if (lastMessageRoom){
            setLastMessage(lastMessageRoom)

            getUnreadMessage(lastMessageDB.room).then((messages) => {
                setUnreadMessageCount(messages.unreadCount)
            })


        }
    }, [lastMessageRoom]);


    // useEffect(() => {
    //     setLastMessage(lastMessageDB)
    //
    //     getUnreadMessage(lastMessageDB.room).then((messages) => {
    //         setUnreadMessageCount(messages.unreadCount)
    //     })
    // }, [lastMessageDB]);


    useEffect(() => {

        if (socket){
            socket.on(_id, (data: MessageProps) => {
                setLastMessage(data)

                getUnreadMessage(data.room).then((messages) => {
                    setUnreadMessageCount(messages.unreadCount)
                })


            })

            socket.on("readMessage", (lastMessageSocket: MessageProps) => {
                setLastMessage(lastMessageSocket)

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
                {`active-message ${params.room_id === _id ? "active" : " " } ${currentUser._id && lastMessage.readBy?.includes(currentUser._id) ? " " : "not-read"}`}

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

                <span className={`user-message ${lastMessage.readBy?.length < 2 ? "not-read-other" : ""}`}
                >

                    {truncate(lastMessage.content, {length: 63})}

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