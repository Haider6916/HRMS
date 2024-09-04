
import {privateRequest,publicRequest} from '../../Services/RequestMethod'
// Action 
import {getOverView,getOverViewSuccess,getOverViewFailure} from '../UserRedux/UserattendsSlice'
// Api get All teamrole

export const getoverViews=async(dispatch,id )=>{

    dispatch(getOverView());
    try{
        const res = await publicRequest.get(`attendance/graphattendance/?userId=${id}`,{headers:{
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET',
            'ngrok-skip-browser-warning':'true',
        }});

    
    dispatch(getOverView(res.data));
    dispatch(getOverViewSuccess(res.data));
    dispatch(getOverViewFailure(res.data));


}
catch(error){
     dispatch(getOverViewFailure())
}
}

