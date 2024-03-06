import {configureStore, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { DELETE, GET, POST } from '../../api/AXIOS';
import { toast } from 'react-toastify';

export const AddTeam=createAsyncThunk('ADD_TEAM',async (data)=>{
    try {
        const response = await POST('user',data);
        toast.success("Team Added Sucessfully...")
        return response.data;
      } catch (error) {
        toast.error(error)
        throw error;
      }
});
export const getTeam=createAsyncThunk('GET_TEAM',async (data)=>{
    try {
        const response = await GET('user');
        return response.data;
      } catch (error) {
        toast.error(error)
        throw error;
      }
});
export const deleteTeam=createAsyncThunk('DELETE_TEAM',async (id)=>{
    try {
        const response = await DELETE('user/'+id);
        toast.success("Team Deleted Sucessfully...")
        getTeam();
        return response.data;
      } catch (error) {
        toast.error(error)
        throw error;
      }
});

const teamSlice=createSlice({
    name:'team',
    initialState:{
        loading:false,
        teams:[],
        is_deleted:false
    },
    
    extraReducers:(builder)=>{
        builder.addCase(AddTeam.fulfilled,(state,action)=>{
            state.loading=false;
        }).addCase(AddTeam.pending,(state,action)=>{
            state.loading=true;
        }).addCase(AddTeam.rejected,(state,action)=>{
            state.loading=false;
        }).addCase(getTeam.fulfilled,(state,action)=>{
            state.loading=false;
            state.teams=action.payload;
        }).addCase(getTeam.pending,(state,action)=>{
            state.loading=true;
        }).addCase(getTeam.rejected,(state,action)=>{
            state.loading=false;
        }).addCase(deleteTeam.fulfilled,(state,action)=>{
            state.loading=false;
        }).addCase(deleteTeam.pending,(state,action)=>{
            state.loading=true;
        }).addCase(deleteTeam.rejected,(state,action)=>{
            state.loading=false;
        })
    }
})


export const teamSliceAction = teamSlice.actions;

export default teamSlice.reducer;