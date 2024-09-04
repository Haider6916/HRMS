import React from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { Typography } from "@mui/material";
import "../CompanyRegistration/style.css";
import {Link} from "@mui/material";
// import {NavLink} from 'react-router-dom'
// import Form from "react-bootstrap/Form";
// import Button from "@mui/material/Button";

function Personaldetails({ data, setData, onSuccess}) {


  const onChangeCheckBox = (e)=>{
    setData({
      ...data,
      agreeTermsAndConditions: e.target.checked
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="Login_Form ">
            <Typography
              variant="p"
              sx={{
                fontSize: "24px",
                lineHeight: "33px",
                fontStyle: "normal",
                letterSpacing: "0.5px",
              }}
            >
              Start for free
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontStyle: "normal",
                fontSize: "42px",
              }}
            >
              Register to DaftarPro
            </Typography>
            {/* <h4 style={{fontStyle:'normal',fontSize:'42px'}}>Register to HRMS</h4> */}
            <Typography
              variant="span"
              sx={{
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              {/* Already have an account? <NavLink href="#">Log in</NavLink> */}
            </Typography>
          </div>
        </div>
      </div>
     <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
       <Form
        name="basic"
        style={{
          
          position: 'relative !important',
          left: '25% !important',
          width: '50%',
        
        
        }}
        layout="vertical"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        initialValues={{
          remember: true,
        }}
        onSuccess={onSuccess}
        data={data}
        autoComplete="off"

        //   onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
       >

         </Form>
    
      </div>
     
    </div>
  );
}

export default Personaldetails;
