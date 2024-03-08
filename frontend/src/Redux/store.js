import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice';
import teamSlice from './Slices/teamSlice';
import stockSlice from './Slices/stockSlice';



const store= configureStore({
    reducer:{
        auth:authSlice,
        team:teamSlice,
        stock:stockSlice
    }
})




export default store;