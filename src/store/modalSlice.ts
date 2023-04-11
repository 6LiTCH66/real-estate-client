import { createSlice } from '@reduxjs/toolkit';

interface ModalWindow{
    showModal: boolean
}

const initialState: ModalWindow = {
    showModal: false
}

const modalSlice = createSlice({
    name: "modalWindow",
    initialState,

    reducers: {
        toggleModal(state){
            return {
                showModal: !state.showModal
            }
        }
    }
})

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;