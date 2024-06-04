import { createSlice } from "@reduxjs/toolkit"

export const imgModalSlice = createSlice({
    name: "imgModal",
    initialState: {
        open: false,
        type: '',
        img: '',
    },
    reducers: {
        openModal: (state, action) => {
            state.open = true;
            state.type = action.payload;
        },
        closeModal: (state) => {
            state.open = false
        },
        openImg: (state, action) => {
            state.img = action.payload
        }
    }
})

export const { openModal, closeModal, openImg } = imgModalSlice.actions


export default imgModalSlice.reducer