import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Favourite} from "../components/UI/FavouriteIcon/FavouriteIcon";
import {Property} from "../types/Property";
import {getFavourites} from "../http/userAPI";
import {RootState} from "./store";

const defaultState: Favourite = {
    propertyId : {} as Property,
    _id: ""
}
interface FavouriteState{
    favourites: Favourite[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const FavouriteStateDefault: FavouriteState = {
    favourites: [defaultState],
    status: "idle"
}
export const fetchFavourites = createAsyncThunk('favouriteSlice/fetchFavourites', async () => {
    return await getFavourites();
});

const favouriteSlice = createSlice({
    name: "favouriteSlice",
    initialState: FavouriteStateDefault,

    reducers: {
        setFavouriteList: (state, action: PayloadAction<Favourite[]>) => {
            state.favourites = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavourites.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchFavourites.fulfilled, (state, action: PayloadAction<Favourite[]>) => {
                state.status = 'succeeded';
                state.favourites = action.payload
            })
            .addCase(fetchFavourites.rejected, (state, action) => {
                state.status = 'failed';
                // state.error = action.error.message || null;
            });
    },
})

export const favourites = (state: RootState) => state.favouriteSlice.favourites

export const { setFavouriteList } = favouriteSlice.actions;
export default favouriteSlice.reducer;