import {privateRequest, publicRequest  } from "../../Services/RequestMethod";
// actions
import {getcompanyDetails,getcompanyDetailsSuccess,getcompanyDetailsFailure,getcompanyDetailsMsg} from './companydetailsSlice'
// apicall get all employees
export const getCompany=async (dispatch)=>{
    dispatch(getcompanyDetails());
    try{
        const res = await publicRequest.get('/company/viewcompany',{headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET',
            'ngrok-skip-browser-warning':'true'
          }});
        // debugger;
        if(res.status===200)
        {
            dispatch(getcompanyDetailsSuccess(res.data));
        }
       else{
        dispatch(getcompanyDetailsMsg(res.data.msg));
       }
       
    }
    catch(error){
        dispatch(getcompanyDetailsFailure())

    }

}