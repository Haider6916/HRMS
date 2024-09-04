import React, { useState } from "react";
import { Typography } from "@mui/material";
import { apiServices } from "../../Services/apiServices";
import { NavLink, useNavigate } from "react-router-dom";
import { message, Row, Col, Input, DatePicker, Spin, Button } from "antd";
import { LoadingOutlined } from '@ant-design/icons';



const Form = () => {


 

  return (
    <div>
      {/* <div className="row mt-5" style={{padding:'0px 120px 0px 120px'}}>
        <div className="col-6" >
          <Typography variant="h4" sx={{fontSize:'18px',lineHeight:'21px'}}>
            {step==2 && <Link onClick={prevStep} style={{textDecoration:'none'}}><ChevronLeftIcon style={{fontSize:'35px'}} /> Back</Link>}
          </Typography>
        </div>
        <div
          className="col-6"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="p"  sx={{fontSize:'14px',lineHeight:'22px',textAlign:'right',color:'#625B71'}}>STEP {step}/2</Typography>
            <Typography variant='h4' sx={{fontSize:'18px',lineHeight:'22px',display:'flex',alignItems:'center',textAlign:'right',color:'#625B71'}}>Company information.</Typography>
          </div>
        </div>
      </div>

      <div>
        {step === 1 && (
          <UserDetails data={data} setData={setData} onSuccess={nextStep} />
        )}

        {step === 2 && (
          <PersonalDetails
            data={data}
            setData={setData}
            onSuccess={() => handleSubmit(data)}
            onBack={prevStep}
            loading={loading}
          />
        )}
      </div> */}

    </div>
  );
};

export default Form;
