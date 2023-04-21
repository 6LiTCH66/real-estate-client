import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface FilterDropdown{
    showDropDown: boolean
}

const initialState: FilterDropdown = {
    showDropDown: false
}

const filterDropDownSlice = createSlice({
    name: "filterDropdown",
    initialState,

    reducers: {
        setShowDropdown(state, action:PayloadAction<boolean>){
            state.showDropDown = action.payload
        }
    }
})

export const {setShowDropdown} = filterDropDownSlice.actions
export default filterDropDownSlice.reducer;