import axios from 'axios';

import { publicRequest,privateRequest } from "./RequestMethod";

export const adduser= async(data)=>{
    try{
      return await axios.post(publicRequest,data,{
        headers:{
          Authorization :`bearer ${JSON.parse(localStorage.getItem('token'))}`,
        }
      });
    }
    catch(error){
        console.log('Error While Calling Adduser Api',error.message)
    
    }
    }