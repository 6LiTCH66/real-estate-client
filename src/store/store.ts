import { configureStore } from '@reduxjs/toolkit';
import dropDownReducer from "./dropdownSlice";
import paginationReducer from "./paginationSlice";
import modalReducer from "./modalSlice";
import userReducer from "./userSlice";
import searchReducer from "./searchSlice";
import filterDropDownReducer from "./fliterDropdown";
import favouriteReducer from "./favouriteSlice";
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        dropDown: dropDownReducer,
        pagination: paginationReducer,
        modalWindow: modalReducer,
        userSlice: userReducer,
        search: searchReducer,
        filterDropdown: filterDropDownReducer,
        favouriteSlice: favouriteReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
