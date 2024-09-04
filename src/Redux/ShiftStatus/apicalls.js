import {privateRequest, publicRequest  } from "../../Services/RequestMethod";
// actions
import {getShiftDetails,getShiftDetailsSuccess,getShiftFailure,getShiftDetailsMsg} from './employeedetailsSlice'
// apicall get all employees
export const getEmployees=async (dispatch)=>{
    // dispatch(getEmployeeDetails());
    try{
        const res = await publicRequest.get('user/viewuser',{headers: {

            Authorization :`Bearer ${JSON.parse(localStorage.getItem('Token'))}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET',
            'ngrok-skip-browser-warning':'true'
          }});
        // debugger;
        if(res.status===200)
        {
            dispatch(getEmployeeDetailsSuccess(res.data));
        }
       else{
        dispatch(getEmployeeDetailsMsg(res.data.msg));
       }
       
    }
    catch(error){
        dispatch(getEmployeeDetailsFailure())

    }

}