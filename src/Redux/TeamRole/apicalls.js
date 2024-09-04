import {privateRequest,publicRequest} from '../../Services/RequestMethod'
// Action 
import {getRoleDetails,getRoleDetailsSuccess,getRoleDetailsFailure,getRoleFailure} from '../TeamRole/teamroleSlice';
// Api get All teamrole

export const getRoles=async(dispatch)=>{
    try{
    dispatch(getRoleDetails());
        const res = await publicRequest.get('role/viewrole',{headers:{
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET',
            'ngrok-skip-browser-warning':'true',
        }});

    
    dispatch(getRoleDetailsSuccess(res.data));
    dispatch(getRoleDetailsFailure(res.data));
}
catch(error){
    dispatch(getRoleFailure())
}
}