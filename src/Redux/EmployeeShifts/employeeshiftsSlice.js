import { createSlice } from "@reduxjs/toolkit";
const employeeshiftsSlice=createSlice({
name:'employeeshiftdetails', 
initialState:{
    shifts:{},
    isFetching:false,
    error:false,
    msg:''
},
reducers:{
    getEmployeeShift:(state)=>{
        state.isFetching=true;
    },
    getEmployeeShiftSuccess:(state,action)=>{
       
        state.isFetching=false;
        state.employees=action.payload
        },
        getEmployeeShiftFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getEmployeeShiftMsg: (state, action) => {
            state.isFetching = false;
            state.msg = action.payload;
        }

    }
})
export const { getEmployeeShift, getEmployeeShiftSuccess, getEmployeeShiftFailure, getEmployeeShiftMsg } =
    employeeshiftsSlice.actions;
export default employeeshiftsSlice.reducer;