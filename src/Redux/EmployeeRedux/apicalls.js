import { publicRequest  } from "../../Services/RequestMethod";
// actions
import {getEmployeeDetails,getEmployeeDetailsSuccess,getEmployeeDetailsFailure,getEmployeeDetailsMsg} from './employeedetailsSlice'
// apicall get all employees
export const getEmployees=async (dispatch)=>{
    let AuthObj= JSON.parse(localStorage.getItem('AuthObj'));
    let athtoken= AuthObj?.acesstoken;
    dispatch(getEmployeeDetails());
    try{
        const res = await publicRequest.get('user/viewuser',{headers: {

            Authorization :'Bearer '+ athtoken,
            'Content-Type': 'application/json',
            Accept: 'application/json',


            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET',
            'ngrok-skip-browser-warning':'true'
          }},2000);
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
