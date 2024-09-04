import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DoneIcon from "@mui/icons-material/Done";
import { useLocation, useNavigate } from "react-router-dom";
import Preview from '../../Assets/images/Side_View.png'
import Link from "@mui/material/Link";
// import "../../CompanyRegisterd/Company_Registration/Styles/Hrms1.css"
import { Typography } from "@mui/material";
const Congratulation = () => {
  const Navigate = useNavigate();
  const location = useLocation();

  let companyName = location.state

  const OnChange = () => {
    Navigate("/superadmin");
  };
  return (
    <div>
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
            DaftarPro can also aid in recruitment and hiring, training and development, and compliance with labor laws
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


          </div>
          <div className="col-8">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: '100%'
                }}
              >
                <div
                  className="Center"
                  style={{
                    background: "#0098C9",
                    borderRadius: "50px",
                    width: "95px",
                    height: "95px",
                  }}
                >
                  <Typography variant="span" >
                    <DoneIcon
                      sx={{
                        color: "#fff",
                        width: "48px",
                        height: "36px",
                        position: 'relative',
                        left: '22%',
                        top: '30%'
                      }}
                    />
                  </Typography>
                </div>
                <div style={{
                  textAlign: 'center'
                }
                }>

                  <Typography variant="h4" sx={{ fontSize: "40px", mt: "10px" }}>
                  Congratulations, {companyName}!
                  </Typography>
                  <Typography

                    sx={{ mt: "4px", fontSize: "14px" }}
                  >
                    Your Company Registred Sucessfully.
                  </Typography>
                  <Typography

                    sx={{ fontSize: "14px" }}
                  >

                    create a super Admin account
                  </Typography>
                </div>


                <Form.Group className="mt-5">
                  <Button
                    type="primary"
                    onClick={OnChange}
                    style={{
                      width: "424px",
                      borderRadius: "50px",
                      height: "60px",
                      // background: "#1574ffab"
                    }}
                  >
                    Create Admin Account
                  </Button>
                </Form.Group>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congratulation;
