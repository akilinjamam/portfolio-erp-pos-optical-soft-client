import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../data/userData/userSlice';


const store = configureStore({
    reducer: {
        users: userSlice
    }
})


export default store;