import { privateRequest,publicRequest } from "../../Services/RequestMethod";

//Action
import {getTeamDetails,getTeamDetailsSuccess,getTeamDetailsFailure,getTeamDetailMsg}  from './teamdetailSlice';
// Api get all Employees
export const getTeams= async(dispatch)=>{
    try{
    dispatch(getTeamDetails());
        const res = await publicRequest.get('team/viewteam',{headers:{
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET',
            'ngrok-skip-browser-warning':'true',

        }});
     
        dispatch(getTeamDetailsSuccess(res.data));
        dispatch(getTeamDetailMsg(res.data))
    }
    catch(error){
        dispatch(getTeamDetailsFailure())

    }



}
