import { createSlice } from "@reduxjs/toolkit"

export const imgModalSlice = createSlice({
    name: "imgModal",
    initialState: {
        open: false,
        lock: false,
        type: '',
        img: '',
        barcode: [],
        customerInfo: {}
    },
    reducers: {
        openModal: (state, action) => {
            state.open = true;
            state.lock = true
            state.type = action.payload;
        },
        closeModal: (state) => {
            state.open = false
            state.lock = false
        },
        openImg: (state, action) => {
            state.img = action.payload
        },
        openBarcode: (state, action) => {
            state.barcode = action.payload
        },
        customerInfo: (state, action) => {
            state.customerInfo = action.payload
        }
    }
})

export const { openModal, closeModal, openImg, openBarcode, customerInfo } = imgModalSlice.actions


export default imgModalSlice.reducer