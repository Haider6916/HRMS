import { privateRequest,publicRequest } from "../../Services/RequestMethod";
// Action 
import {getEmployStatus,getEmployDetailStatusSuccess,getEmployDetailStatusFailure,getEmployStatusFailure} from "../EmploymentStatus/employstatusSlice";

// Api getAll EmployStatus
export const getemployStatus = async(dispatch)=>{
    dispatch(getEmployStatus());
    try{
        const res = await publicRequest.get('employeestatus/viewemployeestatus',{headers:{
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET',
            'ngrok-skip-browser-warning':'true',
        }});
        dispatch(getEmployDetailStatusSuccess(res.data))
        dispatch(getEmployDetailStatusFailure(res.data))
    }
    catch(error){
        dispatch(getEmployStatusFailure())
    }

}