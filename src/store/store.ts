import { configureStore } from '@reduxjs/toolkit';
import dropDownReducer from "./dropdownSlice";
import paginationReducer from "./paginationSlice";
import modalReducer from "./modalSlice";
import userReducer from "./userSlice";
import searchReducer from "./searchSlice";

const store = configureStore({
    reducer: {
        dropDown: dropDownReducer,
        pagination: paginationReducer,
        modalWindow: modalReducer,
        userSlice: userReducer,
        search: searchReducer

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
