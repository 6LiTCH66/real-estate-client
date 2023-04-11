import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserAuthentication} from "../types/UserAuthentication";

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
            state.isAuth = true;
        },
        logout: (state) => {
            localStorage.removeItem("user")
            state.currentUser = {} as UserAuthentication;
            state.isAuth = false;
        }
    }
})

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;