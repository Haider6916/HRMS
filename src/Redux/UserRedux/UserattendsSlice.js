import { createSlice } from "@reduxjs/toolkit";

const Overview = createSlice({
    name:'overView',
    initialState:{
        overView:{},
        isFetching:false,
        isLogin:false,
        error:false,
    },
    reducers:{
        getOverView:(state)=>{
            state.isFetching=true
        },
        getOverViewSuccess:(state,action)=>{
            state.isFetching=false;
            state.currentUser=action.payload;
            state.isLogin=true;
        },
        getOverViewFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
            state.isLogin=false;
        },
      
    }
})
export const {
    getOverView,getOverViewSuccess,getOverViewFailure
}= Overview.actions;
export default Overview.reducer