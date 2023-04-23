import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserAuthentication} from "../types/UserAuthentication";
import store from "./store";

interface UserState{
    currentUser: UserAuthentication,
    isAuth: boolean
}

const defaultState: UserState = {
    currentUser: {} as UserAuthentication,
    isAuth: false,
};

const userSlice = createSlice({
    name: "userSlice",
    initialState: defaultState,

    reducers: {
        setUser: (state, action: PayloadAction<UserAuthentication>) =>{
            state.currentUser = action.payload;
            state.isAuth = localStorage.getItem("user") ? true : false;
        },
        logout: (state) => {
            localStorage.removeItem("user")
            state.currentUser = {} as UserAuthentication;
            state.isAuth = false;
        },
        checkAuth: (state) => {
            state.isAuth = localStorage.getItem("user") ? true : false;
        }
    }
})

export const { setUser, logout, checkAuth } = userSlice.actions;
export default userSlice.reducer;