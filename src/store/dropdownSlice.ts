import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ButtonClickedState} from "../types/ButtonClickedProps";

const initialState: ButtonClickedState = {
    statusButton: false,
    typeButton: false,
    bedsBathsButton: false,
    sortButton: false
};

const dropDownSlice = createSlice({
    name: 'dropDown',
    initialState,
    reducers: {
        toggleButton(state, action: PayloadAction<string>) {
            switch (action.payload) {
                case 'statusButton':
                    state.statusButton = !state.statusButton;
                    break;
                case 'typeButton':
                    state.typeButton = !state.typeButton;
                    break;
                case 'bedsBathsButton':
                    state.bedsBathsButton = !state.bedsBathsButton;
                    break;
                case 'sortButton':
                    state.sortButton = !state.sortButton;
                    break;
            }
        },
        reset(state) {
            return initialState;
        },
    },
});

export const { toggleButton, reset } = dropDownSlice.actions;

export default dropDownSlice.reducer;