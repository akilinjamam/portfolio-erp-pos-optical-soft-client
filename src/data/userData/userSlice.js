import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchGetUserData } from "../fetchedData/fetchUserData";

export const fetchUsers = createAsyncThunk("users/fetchUsers",
    fetchGetUserData
)


const usersSlice = createSlice({
    name: "users",
    initialState: {
        isLoading: false,
        users: [],
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
            state.error = null
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.users = [];
            state.error = action?.error?.message || action?.error
        })
    }
})

export default usersSlice.reducer;