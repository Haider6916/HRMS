import React from "react";
import { Button, Form, Input, DatePicker, Spin } from "antd";
import { Typography } from "@mui/material";
import "../SuperAdmin/style.css";

import { NavLink } from "react-router-dom";

const PersonalDetails = ({ loading, onSuccess, data, setData }) => {
  



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
                fontFamily: "Open Sans",
              }}
            >
              Create Super Admin
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
              Already have an account? <NavLink to='/employlogin'>Log in</NavLink>
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
};

export default PersonalDetails;
