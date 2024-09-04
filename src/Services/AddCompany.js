import axios from 'axios';

import { publicRequest,privateRequest } from "./RequestMethod";

export const addCompany= async(data)=>{
    try{
      return await axios.post(publicRequest,data);
    }
    catch(error){
        console.log('Error While Calling AddCompany Api',error.message)
    
    }
    }