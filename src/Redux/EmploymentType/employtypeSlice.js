import { createSlice } from "@reduxjs/toolkit";
const employTypeSlice = createSlice({
    name:'employRole',
    initialState:{
        EmployType:{},
        isFetching:false,
        error:false,
        msg:'',
    },
    reducers:{
        getEmploytypeDetails:(state)=>{
            state.isFetching=true
        },
        getEmploytypeDetailsSuccess:(state,action)=>{
            state.isFetching = false;
            state.EmployType = action.payload
        },
        getEmploytypeDetailFailure:(state)=>{
            state.isFetching = false
            state.error = true
        },
        getEmploytypeFailure:(state,action)=>{
            state.isFetching=false
            state.msg = action.payload
        }
    }
})
export const {getEmploytypeDetails,getEmploytypeDetailsSuccess,getEmploytypeDetailFailure,getEmploytypeFailure}=employTypeSlice.actions
export default employTypeSlice.reducer