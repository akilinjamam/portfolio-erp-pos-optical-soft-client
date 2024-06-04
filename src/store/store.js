import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../data/userData/userSlice';
import imgModalSlice from '../components/modal/imgmodal/imgModalSlice';
import productSlice from '../data/productData/productSlice';


const store = configureStore({
    reducer: {
        users: userSlice,
        products: productSlice,
        imgModal: imgModalSlice
    }
})



export default store;