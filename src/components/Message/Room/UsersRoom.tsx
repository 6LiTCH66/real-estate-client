import React, {FC, useEffect} from 'react';
import "./room.scss"
import {truncate} from "lodash";
import {useParams, useNavigate} from "react-router-dom";


interface RoomComponentProps{
    _id: string,
    email: string,
    lastMessage: string,
}

const UsersRoom:FC<RoomComponentProps> = ({email, lastMessage, _id}) => {
    const params = useParams();
    const navigate = useNavigate();

    const openChatRoom = () => {
        navigate(`/messages/${_id}`)
    }


    return (
        <div className={`active-message ${params.room_id === _id ? "active" : ""}`} onClick={openChatRoom}>
            <div className="picture">
                <span>
                    {email.slice(0, 2)}
                </span>
            </div>
            <div className="active-message-info">
                        <span className="user-email">
                            {truncate(email, {length: 27})}
                        </span>
                <span className="user-message">
                    {truncate(lastMessage, {length: 63})}
                </span>
            </div>
        </div>
    );
}

export default UsersRoom;