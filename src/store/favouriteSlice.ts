import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Favourite} from "../components/UI/FavouriteIcon/FavouriteIcon";
import {Property} from "../types/Property";
import {addToFavourite, deleteFavourite, getFavourites} from "../http/userAPI";
import {RootState} from "./store";

const defaultState: Favourite = {
    propertyId : {} as Property,
    _id: ""
}

interface FavouriteState{
    favourites: Favourite[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    isLoading: boolean;
}

const FavouriteStateDefault: FavouriteState = {
    favourites: [defaultState],
    status: "idle",
    isLoading: true,
}
export const fetchFavourites = createAsyncThunk('favouriteSlice/fetchFavourites', async () => {
    return await getFavourites();
});

export const deleteReduxFavourites = createAsyncThunk('favouriteSlice/deleteReduxFavourites', async (propertyId: string) => {
    return await deleteFavourite(propertyId);
});

export const addReduxFavourites = createAsyncThunk('favouriteSlice/addReduxFavourites', async (propertyId: string) => {
    return await addToFavourite(propertyId);
});


const favouriteSlice = createSlice({
    name: "favouriteSlice",
    initialState: FavouriteStateDefault,

    reducers: {
        setFavouriteList: (state, action: PayloadAction<Favourite[]>) => {
            state.favourites = action.payload
        },

        setFavouriteLoading : (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
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
            })

            .addCase(deleteReduxFavourites.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteReduxFavourites.fulfilled, (state, action: PayloadAction<Favourite[]>) => {
                state.status = 'succeeded';
                state.favourites = action.payload
            })
            .addCase(deleteReduxFavourites.rejected, (state, action) => {
                state.status = 'failed';
            })

            .addCase(addReduxFavourites.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addReduxFavourites.fulfilled, (state, action: PayloadAction<Favourite[]>) => {
                state.status = "succeeded"

                state.favourites = action.payload
            })
            .addCase(addReduxFavourites.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
})

export const favourites = (state: RootState) => state.favouriteSlice.favourites
export const { setFavouriteList, setFavouriteLoading } = favouriteSlice.actions;
export default favouriteSlice.reducer;