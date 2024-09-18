import { createSlice } from "@reduxjs/toolkit"

export const imgModalSlice = createSlice({
    name: "imgModal",
    initialState: {
        open: false,
        type: '',
        img: '',
        barcode: [],
        warning: ''
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
        },
        openBarcode: (state, action) => {
            state.barcode = action.payload
        },
        openWarning: (state, action) => {
            state.warning = action.payload
        }
    }
})

export const { openModal, closeModal, openImg, openBarcode, openWarning } = imgModalSlice.actions


export default imgModalSlice.reducer