import { configureStore } from '@reduxjs/toolkit';
import dropDownReducer from "./dropdownSlice";
import paginationReducer from "./paginationSlice";
import modalReducer from "./modalSlice";

const store = configureStore({
    reducer: {
        dropDown: dropDownReducer,
        pagination: paginationReducer,
        modalWindow: modalReducer

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
