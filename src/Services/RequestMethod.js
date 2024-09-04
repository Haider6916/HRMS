import axios from 'axios';
    let location = window.location.origin

    const DEV_BASE_URL =" https://daftar-pro-stage.herokuapp.com"
    const PRD_BASE_URL = "https://hrms.herokuapp.com";

    let BASE_URL = (location === "https://www.daftarpro.com" || location === "https://daftarpro.com") ? PRD_BASE_URL : DEV_BASE_URL
const AttendsToken = JSON.parse(localStorage.getItem('Attends'))

export const publicRequest=axios.create({
    baseURL:BASE_URL,
    headers:{
        'Content-Type': 'application/json',
        Authorization:'Bearer' + AttendsToken,
        Accept: 'application/json',


    }
});
export const privateRequest=axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
});
