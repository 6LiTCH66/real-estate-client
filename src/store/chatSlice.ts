import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {UserAuthentication} from "../types/UserAuthentication";
interface ChatState {
    last_message: string
}

const initialState: ChatState = {
    last_message: ""

};

const chatSlice = createSlice({
    name: "chat",
    initialState,

    reducers: {
        setLastMessage: (state, action: PayloadAction<string>) =>{
            state.last_message = action.payload;

        },
    }
})
export const {setLastMessage} = chatSlice.actions;
export default chatSlice.reducer;