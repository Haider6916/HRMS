import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice =createSlice({
    name:'dasboard',
    initialState:{
        currentUser:null,
        isFetching:false,
        isLogin:false,
        error:false,
    },
    reducers:{
        getDashboard:(state)=>{
            state.isFetching=true;
        },
        getDashboardSuccess:(state,action)=>{
            state.isFetching=false;
            state.currentUser=action.payload;
            state.isLogin=true;
        },
        getDashboardFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
            state.isLogin=false;
        },
        logoutSuccess:(state)=>{
            state.isLogin= false;
            state.error=false;
            state={};

        },
        logoutFailure:(state)=>{
            state.isFetching = false;
            state.error = true;
        }
        
    }
});
    export const { 
        getDashboard,
        getDashboardSuccess,
        getDashboardFailure,
        logoutSuccess,
        logoutFailure,
    }= dashboardSlice.actions;
    export default dashboardSlice.reducer;