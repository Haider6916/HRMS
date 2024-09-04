import { Typography } from "@mui/material";
import React from "react";
import Userregist from "../../Components/CompanyRegistration/User";
import Preview from "../../Assets/images/Side_View.png";
const Registerd_Hrms = () => {
  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        <div
          className="col-4 bg-primary"
          style={{
            padding: '0px',
            background: "#0098C9",
          }}
        >
          <p style={{ position: "absolute", top: '37%', width: '17%', left: '9%', color: '#fff' }}>
          These systems manage employee data, including personal information, payroll, benefits, and performance evaluations
          </p>
          <img
            src={Preview}
            style={{
              height: "100vh",
              backgroundRepeat: "no-repeat",
              width: "100%",
              backgroundSize: "cover",
              margin: '0px',
              padding: '0px'
            }}
          />

          <div>
            {/* <Typography variant='p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography> */}
          </div>
        </div>
    
        <div className="col-8">
        
          <Userregist />
        </div>
      </div>
    </div>
  );
};

export default Registerd_Hrms;
