import {UserAuthentication} from "../types/UserAuthentication";
import axios from "axios";
import {setUser} from "../store/userSlice";
import store from "../store/store";
import {Favourite} from "../components/UI/FavouriteIcon/FavouriteIcon";


export const login = async (userCredentials: UserAuthentication):Promise<UserAuthentication> => {
    try{
        const user = await axios.post<UserAuthentication>(`${process.env.REACT_APP_BASE_URL}/auth/sign-in`, userCredentials, {withCredentials: true})
        return user.data

    }catch (error){
        console.error(error)
        throw error
    }

}

export const logout = async () => {
    try{
        const user = await axios.post<UserAuthentication>(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {}, {withCredentials: true})

    }catch (error){
        console.error(error)
    }

}

export const addToFavourite = async (propertyId: string) => {
    try{
        await axios.post(`${process.env.REACT_APP_BASE_URL}/user/add-favourite/${propertyId}`, {}, {withCredentials: true})

    }catch (error){
        console.error(error)
    }
}

export const deleteFavourite = async (propertyId: string) => {
    try{
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/user/delete-favourite/${propertyId}`, {withCredentials: true})
    }catch (err){
        console.error(err)
    }
}

export const getFavourites = async ():Promise<Favourite[]> => {
    try{
        const favourites = await axios.get<Favourite[]>(`${process.env.REACT_APP_BASE_URL}/user/favourites`, {withCredentials: true})
        return favourites.data
    }catch (error){
        console.error(error)
        throw error;
    }
}

export const signup = async (userCredentials: UserAuthentication):Promise<UserAuthentication> => {
    try{
        const user = await axios.post<UserAuthentication>(`${process.env.REACT_APP_BASE_URL}/auth/sign-up`, userCredentials)
        console.log(user.data)
        return user.data

    }catch (error){
        console.error(error)

        throw error
    }
}