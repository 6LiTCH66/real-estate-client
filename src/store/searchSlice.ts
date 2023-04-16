import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PropertySearch} from "../types/PropertySearch";



const defaultSearch: PropertySearch = {
    property_type: undefined,
    property_status: undefined,
    baths: undefined,
    beds: undefined
}

export interface PropertySearchState{
    property_search: PropertySearch;
}

const defaultState: PropertySearchState = {
    property_search: defaultSearch
}

const searchSlice = createSlice({
    name: "search",
    initialState: defaultState,

    reducers: {
        setHeaderSearch: (state, action:PayloadAction<string>) => {
            state.property_search.property_type = action.payload
        },

        setFilterSearch: (state, action: PayloadAction<PropertySearch>) => {
            state.property_search = {...action.payload}

        }


    }
})

export const {setHeaderSearch,setFilterSearch, } = searchSlice.actions;
export default searchSlice.reducer;