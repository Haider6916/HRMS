import {privateRequest,publicRequest} from '../../Services/RequestMethod'
// Action
import {getEmploytypeDetails,getEmploytypeDetailsSuccess,getEmploytypeDetailFailure,getEmploytypeFailure} from '../EmploymentType/employtypeSlice';

// Api GetAll TypeRole
export const getemployType = async(dispatch)=>{
    dispatch(getEmploytypeDetails());
    try{
        const res = await publicRequest.get('employeetype/viewemployeetype',{headers:{
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET',
            'ngrok-skip-browser-warning':'true',
        }});
        dispatch(getEmploytypeDetailsSuccess(res.data));
        dispatch(getEmploytypeDetailFailure(res.data))
    }
    catch(error)
    {
        dispatch(getEmploytypeFailure())
    }
}