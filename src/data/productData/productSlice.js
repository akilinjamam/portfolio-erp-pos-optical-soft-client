import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchGetProductData } from "../fetchedData/fetchProductData";

export const fetchProducts = createAsyncThunk("products/fetchProducts",
    fetchGetProductData
)

const productSlice = createSlice({
    name: "products",
    initialState: {
        isLoading: false,
        users: [],
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
            state.error = null
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.products = [];
            state.error = action?.error?.message || action?.error
        })
    }
})

export default productSlice.reducer;