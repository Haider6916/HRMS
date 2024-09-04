import { createSlice } from "@reduxjs/toolkit";

const UserInfo = createSlice({
    name:'UserInfo',
    initialState:{
        userInfo:{},
        isLogin:false,
        error:false,

    },
    reducers:{
        getSuccessinfo:(state,action)=>{
            state.userInfo=action.payload;
            state.isLogin=true;
        },
    
        getFailure:(state,action)=>{
            state.error = true;
            state.msg = action.payload

        }

    }


})
export const{
    getSuccessinfo,getFailure
} = UserInfo.actions;
export default UserInfo.reducer
    