import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ButtonClickedState} from "../types/ButtonClickedProps";


const initialState: ButtonClickedState = {
    statusButton: false,
    typeButton: false,
    bedsBathsButton: false,
    sortButton: false,

};

interface UpdateDropdownAction {
    type: "UPDATE_DROPDOWN";
    buttonName: keyof ButtonClickedState;
}



const dropDownSlice = createSlice({
    name: 'dropDown',
    initialState,

    reducers: {
        toggleButton(state, action: PayloadAction<string>) {
            return {
                ...state,
                [action.payload]: !state[action.payload],
                statusButton: action.payload === "statusButton" ? !state.statusButton: false,
                typeButton: action.payload === "typeButton" ? !state.typeButton: false,
                bedsBathsButton: action.payload === "bedsBathsButton" ? !state.bedsBathsButton: false,
                sortButton: action.payload === "sortButton" ? !state.sortButton: false
            }
        },
        reset(state){
            return initialState;
        }

    },
});

export const { toggleButton, reset } = dropDownSlice.actions;

export default dropDownSlice.reducer;