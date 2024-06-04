import { createSlice } from "@reduxjs/toolkit"

export const imgModalSlice = createSlice({
    name: "imgModal",
    initialState: {
        open: false,
        img: '',
    },
    reducers: {
        openModal: (state) => {
            state.open = true
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