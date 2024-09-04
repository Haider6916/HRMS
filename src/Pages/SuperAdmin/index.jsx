import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import Preview from '../../Assets/images/Side_View.png'
import { apiServices } from "../../Services/apiServices";
import { message, Row, Col, Input, DatePicker, Spin, Button, Form } from "antd";
import { Typography } from "@mui/material";
import { LoadingOutlined } from '@ant-design/icons';
import PhoneNoInput from '../../Components/PhoneNoInput';
import userEvent from '@testing-library/user-event';
import './style.css'
import DoneIcon from "@mui/icons-material/Done";


const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
      color: '#fff'
    }}
    spin
  />
);
const Superadmin = () => {


  const auth = localStorage.getItem("CompanyId");
  const CompanyId = JSON.parse(auth);
  const [loading, setLoader] = useState(false)

  const [userCreated, setuserCreated] = useState(false)

  const navigate = useNavigate()
  const [data, setData] = useState({
    fullName: "",
    contactNo: "",
    companyID: CompanyId,
    email: "",
    password: "",
  });


  const handleSubmit = (values) => {
    setLoader(true)
    if (data.email && data.password) {
      let data = {
        name: values?.fullName,
        email: values?.email,
        password: values?.password,
        contactNo: values?.contactNo,
        companyID: values?.companyID,
      };
      apiServices("POST", "admin/createadmin", data).then((res) => {
        if (res.data.success === true)
          message.success("Admin created successfully")
          //  navigate('/employlogin')
          setuserCreated(true)
      }).catch((err) => {
        setLoader(false)
        message.error("Registration failed!")
      })
    } else {
      message.error("Please input required fields")
    }
  };

  const onChangePhone = (value) => {
    let newvalue = "+" + value
    setData({ ...data, contactNo: newvalue })
  }


  return (
    <div className='container-fluid'>
      <div className='row' style={{ height: "100vh" }}>
        <div
          className="col-4 bg-primary"
          style={{
            padding: '0px',
            background: "#0098C9",
          }}
        >
          <p style={{ position: "absolute", top: '37%', width: '17%', left: '9%', color: '#fff' }}>
          They can be integrated with other systems like Applicant Tracking Systems or Time and Attendance Systems to create a more comprehensive solution
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
            alt=""
          />

        </div>
        <div className='col-8'>
          <div style={{
            height: "100%",
            display: "grid",
            alignItems: "center",
            alignContent: "center",
          }}>
            {userCreated
              ?
              <>
                <div style={{
                  textAlign: 'center'
                }
                }>

                  <Typography variant="span" >
                    <DoneIcon
                      sx={{
                        color: "#fff",
                        backgroundColor: '#0098C9',
                        width: "68px",
                        height: "68px",
                        position: 'relative',
                        // left: '22%',
                        top: '20%',
                        borderRadius: '50%'
                      }}
                    />
                  </Typography>
                  
                  <Typography variant="h4" sx={{ fontSize: "40px", mt: "30px" }}>
                    Congratulations, {data.fullName}!
                  </Typography>
                  <Typography

                    sx={{ mt: "12px", fontSize: "16px", color: '#0992bf' }}
                  >
                    Admin account registred sucessfully. Please visit email to verify <br /> your account!
                  </Typography>
                  <Typography

                    sx={{ fontSize: "14px" }}
                  >


                  </Typography>
                </div>

              </>
              :
              <>
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
                          marginTop: '3px'
                        }}
                      >
                        Create Super Admin
                      </Typography>
                      <Typography
                        variant="span"
                        sx={{
                          fontStyle: "normal",
                          fontWeight: "700",
                          fontSize: "14px",
                          lineHeight: '22px',
                          marginTop: '10px'
                        }}
                      >
                        Already have an account? <NavLink to='/employlogin'>Log in</NavLink>
                      </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} > 
                
                    <Form
                      name="basic"
                      layout="vertical"
                      data={data}
                      initialValues={{
                        fullName: data.fullName,
                        cnic: data.cnic,
                        contactNo: data.contactNo,
                        address: data.address,
                        email: data.email,
                        password: data.password
                      }}
                      autoComplete="off"
                    >
                        <Row gutter={6}>
                          <Col span={12}>
                            <Form.Item
                              label="Full Name"
                              name="fullName"
                              rules={[
                                { required: true, message: "please input your Full Name" }
                              ]}
                            >
                              <Input
                                placeholder="Full Name"
                                className="Text-Field"
                                style={{
                                  width: '100%', borderRadius: '10px'
                                }}
                                value={data.fullName}
                                onChange={(e) => setData({ ...data, fullName: e.target.value })}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                            className="phone-input-style"
                              label="Contact No"
                              name="contactNo"
                              rules={[
                                {
                                  required: true,
                                  message: "please enter your contact number"
                                },
                                {
                                  type: "Number", message: 'Please enter a valid contact number'
                                },
                                { min: 10 },
                                {
                                  max: 11,
                                  message: 'Please enter valid number'
                                }
                              ]}
                            >
                              <PhoneNoInput
                                phone={data.contactNo}
                                onChangePhone={onChangePhone}
                              />

                              {/* <Input
                                placeholder="03xxxxxxxxx"
                                value={data.contactNo}
                                maxLength={11}
                                className="Text-Field"
                                onChange={(e) => setData({ ...data, contactNo: e.target.value })}
                              /> */}
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={6}>
                          <Col span={12}>
                                <Form.Item
                                  label="Email"
                                  name="email"
                                  rules={[
                                    { required: true, message: "please input your Email" },
                                    { type: 'email', message: 'Please enter valid email' }
                                  ]}
                                >
                                  <Input
                                    placeholder="admin@company.com"
                                    className="Text-Field"
                                    value={data.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    style={{ borderRadius: '10px' }}
                                  />
                                </Form.Item>
                              </Col>
                          <Col span={12}>
                                <Form.Item
                                  label="Password"
                                  name="password"
                                  rules={[{ required: true, message: "please input your Password" },
                                    { min: 8, message:  'Password length shouldbe more than 8'}
                                ]}
                                >
                                  <Input.Password
                                    maxLength={25}
                                    className="Text-Field"
                                    placeholder="password"
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    style={{ borderRadius: '10px' }}
                                  />
                                </Form.Item>
                              </Col>
                        </Row>

                      <div className="continue-button">
                        <Button type="primary" onClick={() => handleSubmit(data)}
                          style={{ fontWeight: '700', fontSize: '20px', lineHeight: '32px', marginTop: '20px' }}
                        >
                          {loading
                            ?
                            <Spin indicator={antIcon} />
                            :
                            <span>Register</span>
                          }
                        </Button>
                      </div>
                    </Form>

                </div>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Superadmin