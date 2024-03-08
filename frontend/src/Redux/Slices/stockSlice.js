import {configureStore, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { DELETE, GET, POST } from '../../api/AXIOS';
import { toast } from 'react-toastify';

export const AddStock=createAsyncThunk('ADD_STOCK',async (data)=>{
    try {
        const response = await POST('stock',data);
        toast.success("Stock Added Sucessfully...")
        return response.data;
      } catch (error) {
        toast.error(error)
        throw error;
      }
});
export const getStock=createAsyncThunk('GET_STOCK',async (data)=>{
    try {
        const response = await GET('stock');
        return response.data;
      } catch (error) {
        toast.error(error)
        throw error;
      }
});
export const deleteStock=createAsyncThunk('DELETE_STOCK',async (id)=>{
    try {
        const response = await DELETE('stock/'+id);
        toast.success("Stock Deleted Sucessfully...")
        getStock();
        return response.data;
      } catch (error) {
        toast.error(error)
        throw error;
      }
});

const stockSlice=createSlice({
    name:'stock',
    initialState:{
        loading:false,
        stocks:[],
        is_deleted:false
    },
    
    extraReducers:(builder)=>{
        builder.addCase(AddStock.fulfilled,(state,action)=>{
            state.loading=false;
        }).addCase(AddStock.pending,(state,action)=>{
            state.loading=true;
        }).addCase(AddStock.rejected,(state,action)=>{
            state.loading=false;
        }).addCase(getStock.fulfilled,(state,action)=>{
            state.loading=false;
            state.stocks=action.payload;
        }).addCase(getStock.pending,(state,action)=>{
            state.loading=true;
        }).addCase(getStock.rejected,(state,action)=>{
            state.loading=false;
        }).addCase(deleteStock.fulfilled,(state,action)=>{
            state.loading=false;
        }).addCase(deleteStock.pending,(state,action)=>{
            state.loading=true;
        }).addCase(deleteStock.rejected,(state,action)=>{
            state.loading=false;
        })
    }
})


export const stockSliceAction = stockSlice.actions;

export default stockSlice.reducer;