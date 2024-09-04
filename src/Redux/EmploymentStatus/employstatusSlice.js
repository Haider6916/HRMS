import { createSlice } from "@reduxjs/toolkit";
const employStatusSlice = createSlice({
    name:'employStatus',
    initialState:{
        EmployStatus:{},
        isFetching:false,
        error:false,
        msg:'',
    },
    reducers:{
        getEmployStatus:(state)=>{
            state.isFetching=true
        },
        getEmployDetailStatusSuccess:(state,action)=>{
            state.isFetching = false;
            state.EmployStatus = action.payload;

        }, 
        getEmployDetailStatusFailure:(state)=>{
            state.isFetching = false;
            state.error = true
        },
        getEmployStatusFailure:(state,action)=>{
            state.isFetching = false;
            state.msg = action.payload
        }
    }

})

export const {getEmployStatus,getEmployDetailStatusSuccess,getEmployDetailStatusFailure,getEmployStatusFailure}=employStatusSlice.actions
export default employStatusSlice.reducer