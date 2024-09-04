import { createSlice } from "@reduxjs/toolkit";
const teamroleSlice = createSlice({
    name:'teamrole',
    initialState:{
        Role:{},   
        isFetching:false,
        error:false,
        msg:''
    },
    reducers:{
        getRoleDetails:(state)=>{
            state.isFetching=true
        },
        getRoleDetailsSuccess:(state,action)=>{
            state.isFetching = false
            state.Role = action.payload
        },
        getRoleDetailsFailure:(state)=>{
            state.isFetching=false
            state.error = true
        },
        getRoleFailure:(state,action)=>{
            state.isFetching = false
            state.msg = action.payload
        }

    }
})
export const {getRoleDetails,getRoleDetailsSuccess,getRoleDetailsFailure,getRoleFailure}=teamroleSlice.actions;
export default teamroleSlice.reducer;
