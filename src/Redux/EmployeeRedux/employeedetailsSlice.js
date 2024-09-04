import { createSlice } from "@reduxjs/toolkit";
const employeedetailsSlice=createSlice({
name:'employeedetails', 
initialState:{
    employees:{},
    isFetching:false,
    error:false,
    msg:''
},
reducers:{
    getEmployeeDetails:(state)=>{
        state.isFetching=true;
    },
    getEmployeeDetailsSuccess:(state,action)=>{
       
        state.isFetching=false;
        state.employees=action.payload
        },
        getEmployeeDetailsFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getEmployeeDetailsMsg: (state, action) => {
            state.isFetching = false;
            state.msg = action.payload;
        },
        AddNewEmployee:(state)=>{
            // state.employees = state.employees
        }

    }
})
export const { getEmployeeDetails, getEmployeeDetailsSuccess, getEmployeeDetailsFailure, getEmployeeDetailsMsg,AddNewEmployee } =
    employeedetailsSlice.actions;
export default employeedetailsSlice.reducer;