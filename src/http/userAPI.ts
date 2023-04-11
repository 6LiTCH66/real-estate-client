import {UserAuthentication} from "../types/UserAuthentication";
import axios from "axios";
import {setUser} from "../store/userSlice";
import store from "../store/store";


export const login = async (userCredentials: UserAuthentication) => {
    try{
        const user = await axios.post<UserAuthentication>(`${process.env.REACT_APP_BASE_URL}/auth/sign-in`, userCredentials)
        store.dispatch(setUser(user.data))
        localStorage.setItem("user", JSON.stringify(user.data))

    }catch (error){
        console.error(error)
    }

}

export const signup = async (userCredentials: UserAuthentication) => {
    try{
        const user = await axios.post<UserAuthentication>(`${process.env.REACT_APP_BASE_URL}/auth/sign-up`, userCredentials)
        console.log(user.data)

    }catch (error){
        console.error(error)
    }
}