import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface SearchState{
    city: string;
    state?: string;
    propertyType: string;
    propertyStatus?: string;
    beds?: number | null;
    baths?: number | null;
}

const defaultState: SearchState = {
    city: "",
    state: "",
    propertyType: "",
    propertyStatus: "",
    baths: null,
    beds: null
}

const searchSlice = createSlice({
    name: "search",
    initialState: defaultState,

    reducers: {
        setHeaderSearch: (state, action:PayloadAction<string>) => {
            state.propertyType = action.payload
        }
    }
})

export const {setHeaderSearch} = searchSlice.actions;
export default searchSlice.reducer;