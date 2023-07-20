import React, {FC, useEffect, useState} from 'react';
import "./room.scss"
import {truncate} from "lodash";
import {useParams, useNavigate} from "react-router-dom";
import {useSocket} from "../../../contexts/SocketContext";
import {MessageProps} from "../../../pages/Messages/Messages";
import message from "../Message";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store";


interface RoomComponentProps{
    _id: string,
    email: string,
    lastMessage: MessageProps,

}

const UsersRoom:FC<RoomComponentProps> = ({email,lastMessage: lastMessageDB, _id}) => {
    const {socket} = useSocket();
    const [lastMessage, setLastMessage] = useState<string>("")

    const params = useParams();
    const navigate = useNavigate();

    const { isAuth,currentUser } = useSelector(
        (state: RootState) => state.userSlice
    );

    useEffect(() => {

        if (socket){
            socket.on(_id, (data: MessageProps) => {

                setLastMessage(data.content)
            })

        }


    }, [socket]);

    useEffect(() => {
        console.log(lastMessageDB)

    }, [lastMessageDB]);




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
                <span className={`user-message ${(lastMessageDB.readBy?.length || 0) <= 2 ? "not-read-other" : ""}`}>
                    {truncate(!lastMessage ? lastMessageDB.content : lastMessage, {length: 63})}
                </span>
            </div>
        </div>
    );
}

export default UsersRoom;