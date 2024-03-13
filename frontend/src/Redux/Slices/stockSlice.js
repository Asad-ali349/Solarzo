import {configureStore, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { DELETE, GET, POST, UPDATE } from '../../api/AXIOS';
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
export const AssignStock=createAsyncThunk('ASSIGN_STOCK',async (data)=>{
    try {
        const response = await POST('stock/assign_stock',data);
        toast.success("Stock Assigned Sucessfully...")
        return response.data;
      } catch (error) {
        toast.error(error)
        throw error;
      }
});
export const UpdateStock=createAsyncThunk('UPDATE_STOCK',async (data)=>{
    try {
        const response = await UPDATE('stock/'+data._id,data);
        toast.success("Stock updated Sucessfully...")
        return response.data;
      } catch (error) {
        toast.error(error)
        throw error;
      }
});
export const getStock=createAsyncThunk('GET_STOCK',async ()=>{
    try {
        const response = await GET('stock');
        return response.data;
      } catch (error) {
        toast.error(error)
        throw error;
      }
});
export const getStockDetail=createAsyncThunk('GET_STOCK_DETAIL',async (id)=>{
    try {
        const response = await GET('stock/'+id);
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
        selectedStock:{
            stock:{},
            summary:[]
        },
    },
    reducers:{
        singleStock:(state,action)=>{
            state.selectedStock=action.payload;
        }
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
        }).addCase(getStockDetail.fulfilled,(state,action)=>{
            state.loading=false;
            state.selectedStock=action.payload;
        }).addCase(getStockDetail.pending,(state,action)=>{
            state.loading=true;
        }).addCase(getStockDetail.rejected,(state,action)=>{
            state.loading=false;
        }).addCase(deleteStock.fulfilled,(state,action)=>{
            state.loading=false;
        }).addCase(deleteStock.pending,(state,action)=>{
            state.loading=true;
        }).addCase(deleteStock.rejected,(state,action)=>{
            state.loading=false;
        }).addCase(UpdateStock.fulfilled,(state,action)=>{
            state.loading=false;
            state.selectedStock=action.payload;
        }).addCase(UpdateStock.pending,(state,action)=>{
            state.loading=true;
        }).addCase(UpdateStock.rejected,(state,action)=>{
            state.loading=false;
        }).addCase(AssignStock.fulfilled,(state,action)=>{
            state.loading=false;
        }).addCase(AssignStock.pending,(state,action)=>{
            state.loading=true;
        }).addCase(AssignStock.rejected,(state,action)=>{
            state.loading=false;
        })
    }
})


export const stockSliceAction = stockSlice.actions;

export default stockSlice.reducer;