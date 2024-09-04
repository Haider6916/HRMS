import { createSlice } from "@reduxjs/toolkit";
const companydetailsSlice=createSlice({
name:'companydetails', 
initialState:{
    CompanyDetails:{},
    isFetching:false,
    error:false,
    msg:''
},
reducers:{
    getcompanyDetails:(state)=>{
        state.isFetching=true;
    },
    getcompanyDetailsSuccess:(state,action)=>{
        state.isFetching=false;
        state.CompanyDetails=action.payload;

        },
        getcompanyDetailsFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        getcompanyDetailsMsg: (state, action) => {
            state.isFetching = false;
            state.msg = action.payload;
        }

    }
})
export const { getcompanyDetails, getcompanyDetailsSuccess, getcompanyDetailsFailure, getcompanyDetailsMsg } =
companydetailsSlice.actions;
export default companydetailsSlice.reducer;