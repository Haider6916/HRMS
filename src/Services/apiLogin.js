import axios from "axios";
export const apiLoginEmployee = async (data) => {
    let location = window.location.origin

    const DEV_BASE_URL =" https://daftar-pro-stage.herokuapp.com"
    const PRD_BASE_URL = "https://hrms.herokuapp.com";

    let BASE_URL = (location === "https://www.daftarpro.com" || location === "https://daftarpro.com") ? PRD_BASE_URL : DEV_BASE_URL
    // let AuthObj= JSON.parse(localStorage.getItem('AuthObj'));
    // let athtoken= AuthObj?.acesstoken;

    // "POST", "admin/loginadmin"
    try {
        let result = axios({
            url: `${BASE_URL}/${'admin/loginadmin'}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: 'Bearer ' + athtoken,
                Accept: 'application/json',
                withCredentials: true
            },
            data: data
        }).then((res) => res)
        return (result)
    } catch (error) {
        console.error("POST API FAILED!");
    }
}