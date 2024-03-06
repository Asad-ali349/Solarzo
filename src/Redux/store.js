import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice';
import teamSlice from './Slices/teamSlice';



const store= configureStore({
    reducer:{
        auth:authSlice,
        team:teamSlice
    }
})




export default store;