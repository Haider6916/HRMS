import {privateRequest, publicRequest  } from "../../Services/RequestMethod";
// actions
import {getEmployeeShift,getEmployeeShiftSuccess,getEmployeeShiftFailure,getEmployeeShiftMsg} from './employeeshiftsSlice'
// apicall get all employees
export const getEmployeesShifts=async (dispatch)=>{
    dispatch(getEmployeeShift());
    try{
        const res = await publicRequest.get('shift',{headers: {

            Authorization :`Bearer ${JSON.parse(localStorage.getItem('Token'))}`,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET',
            'ngrok-skip-browser-warning':'true'
          }});
        // debugger;
        if(res.status===200)
        {
            dispatch(getEmployeeShiftSuccess(res.data));
        }
       else{
        dispatch(getEmployeeShiftMsg(res.data.msg));
       }
       
    }
    catch(error){
        dispatch(getEmployeeShiftFailure())

    }

}