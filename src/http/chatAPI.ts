import {Chat} from "../components/ContactFrom/ContactForm";
import axios, {AxiosRequestConfig} from "axios";
import {MessageProps, Room, RoomData} from "../pages/Messages/Messages";
import {UnreadMessagesCount} from "../components/Message/Room/UsersRoom";


export const createRoom = async (chatData: Chat) => {
    try{
        const newChat = await axios.post<Chat>(`${process.env.REACT_APP_BASE_URL}/chat/create-room`, chatData, {
            withCredentials: true
        });
        return newChat.data
    }catch (err){
        console.log(err)
        throw err

    }
}

export const getRooms = async () => {
    try{
        const rooms = await axios.get<RoomData>(`${process.env.REACT_APP_BASE_URL}/chat/get-rooms`, {withCredentials: true});
        return rooms.data

    }catch (err){
        console.log(err)
        throw err

    }
}

export const getMessages = async (room_id: string | undefined):Promise<Room> => {
    const config: AxiosRequestConfig = {
        params:{
            room_id: room_id
        }
    }
    try{
        const rooms = await axios.get<Room>(`${process.env.REACT_APP_BASE_URL}/chat/get-messages`, {withCredentials: true, params: config});
        return rooms.data

    }catch (err){
        console.log(err)
        throw err

    }
}

export const readMessage = async (room_id: string) => {

    const config: AxiosRequestConfig = {
        params:{
            room_id: room_id
        }
    }

    try{
        const rooms = await axios.post(`${process.env.REACT_APP_BASE_URL}/chat/read-message`, {},{withCredentials: true, params: config});
        return rooms.data

    }catch (err){
        console.log(err)
        throw err

    }
}

export const getUnreadMessage = async (room_id: string) => {

    const config: AxiosRequestConfig = {
        params:{
            room_id: room_id
        }
    }

    try{
        const rooms = await axios.get<UnreadMessagesCount>(`${process.env.REACT_APP_BASE_URL}/chat/count-unread`,{withCredentials: true, params: config});
        return rooms.data

    }catch (err){
        console.log(err)
        throw err

    }
}

export const countUnreadMessage = async () => {


    try{
        const rooms = await axios.get<UnreadMessagesCount>(`${process.env.REACT_APP_BASE_URL}/chat/count-all-unread`,{withCredentials: true});
        return rooms.data

    }catch (err){
        console.log(err)
        throw err

    }
}

export const getLastMessage = async (room_id: string):Promise<MessageProps> => {
    const config: AxiosRequestConfig = {
        params:{
            room_id: room_id
        }
    }

    try{
        const rooms = await axios.get<MessageProps>(`${process.env.REACT_APP_BASE_URL}/chat/get-last`,{withCredentials: true, params: config});
        return rooms.data

    }catch (err){
        console.log(err)
        throw err

    }
}