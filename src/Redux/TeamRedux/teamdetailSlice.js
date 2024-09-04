import { createSlice } from "@reduxjs/toolkit";
const teamdetailSlice = createSlice({
    name:'teamDetails',
    initialState:{
        Teams:{},
        isFetching:false,
        error:false,
        msg:''
    },
    reducers:{
        getTeamDetails:(state)=>{
            state.isFetching=true
        },
        getTeamDetailsSuccess:(state,action)=>{
            state.isFetching = false;
            state.Teams = action.payload
        },
        getTeamDetailsFailure:(state)=>{
            state.isFetching = false;
            state.error = true
        },
        getTeamDetailMsg:(state,action)=>{
            state.isFetching=false;
            state.msg=action.payload

        }
    }
})
export const {getTeamDetails,getTeamDetailsSuccess,getTeamDetailsFailure,getTeamDetailMsg} = 
teamdetailSlice.actions;
export default teamdetailSlice.reducer

