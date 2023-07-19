import React, {useEffect, useRef, useState, FC} from 'react';
import "./messages.scss"
import {io} from "socket.io-client"
import Message from "../../components/Message/Message";
import {useId} from "react";
import {current} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {UserAuthentication} from "../../types/UserAuthentication";
import {truncate} from "lodash";
import {getRooms} from "../../http/chatAPI";
import {useQuery} from "react-query";
import UsersRoom from '../../components/Message/Room/UsersRoom';
import {Outlet} from "react-router-dom";

// interface MessageData{
//     room: string,
//     author: UserAuthentication,
//     message: string,
//     time: string
// }

export interface MessageProps{
    _id?: string,
    content: string,
    createdAt?: Date,
    updatedAt?: Date,
    user: UserAuthentication,
    room: string,
    className?: string

}

export interface Room{
    _id: string,
    messages: MessageProps[],
    users: UserAuthentication[],

}

export interface RoomData{
    _id: string,
    rooms: Room[]
}


// const socket = io("http://localhost:3000")
interface MessagesComponentProps{
    children?: React.ReactNode
}

const Messages:FC<MessagesComponentProps> = ({children}) => {

    const {data: roomsList, isLoading, isError} = useQuery<RoomData>("rooms", getRooms)

    const { isAuth,currentUser } = useSelector(
        (state: RootState) => state.userSlice
    );



    return (
        <div className="messenger">

            <div className="chat-rooms">

                {roomsList ? (
                    <>
                        {roomsList.rooms.map((room, index) => (
                            <UsersRoom
                                _id={room._id}
                                email={room.users[0]?.email}
                                key={room._id}
                                lastMessage={room.messages[room.messages.length - 1]?.content}/>

                        ))}
                    </>
                ):(
                    <span>Your chat rooms will appear here</span>
                )}


            </div>

            <Outlet/>


        </div>
    );
}

export default Messages;