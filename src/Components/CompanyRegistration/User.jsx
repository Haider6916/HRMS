import React, { useState, useCallback } from "react";
import Personaldetails from "./Personaldetails";

import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Signup from "./Signup";
import { NavLink, useNavigate } from "react-router-dom";
import { apiServices } from "../../Services/apiServices";
// import Congratulation from "../CompanyRegisterd/Company_Registration/Congratulation";
// import Congratulation from "../CompanyRegisterd/Company_Registration/Congratulation";
import { Button, Checkbox, Form, Input, message, Row, Col, Select } from "antd";
import PhoneNoInput from "../PhoneNoInput";

const Userregist = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    companyName: "",
    companyAddress: "",
    companyCategory: "",
    companyEmail: "",
    companyContactNo: "",
    agreeTermsAndConditions: false
  });

  const onChangeCheckBox = (e) => {
    setData({
      ...data,
      agreeTermsAndConditions: e.target.checked
    })
  }

  const onChangePhone = (value) => {
    let newvalue = "+" + value
    setData({ ...data, companyContactNo: newvalue })
  }

  const handleSubmit = (values) => {
    try {
      if(data.companyEmail !== "" && data.companyContactNo !== ""){
        let data = {
          companyName: values?.companyName,
          companyAddress: values?.companyAddress,
          companyCategory: values?.companyCategory,
          companyEmail: values?.companyEmail,
          companyContactNo: values?.companyContactNo,
          agreeTermsAndConditions: values?.agreeTermsAndConditions
        };
        apiServices("POST", "company/addcompany", data).then((res) => {
          if (res?.data?.success) {
            localStorage.setItem("CompanyId", JSON.stringify(res?.data?.Company?._id))
            navigate('/congratulation', { state: data.companyName })
          }
          else {
            console.log("values Not Found")
          }
        }
        ).catch((err)=>{
          message.error(`${err.response.data.msg ? err.response.data.msg : err.response.data.validation.body.message ? err.response.data.validation.body.message : 'Register'} Error`)
        })
      }
      else{
        message.error("Please fill required fields")
      }

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      <div className="container" >
        <headers>
          {/* <div className="row mt-4" style={{padding:'0px 120px 0px 120px'}}>
            <div className="col-6">
              <Typography variant="h4" sx={{fontSize:'18px',lineHeight:'21px',color:'#8692A6'}}>
                {step==2 && <Link onClick={PrevStep} style={{textDecoration:'none'}}><ChevronLeftIcon style={{fontSize:'35px'}} />Back</Link>}
              </Typography>
            </div>
            <div
              className="col-6"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="p" sx={{fontSize:'14px',lineHeight:'19px',textAlign:'right',color:'#625B71'}}>STEP {step}/2</Typography>
              </div>
            </div>
          </div> */}
          <div className="mt-3">
            <Typography variant='h4' sx={{fontSize:'16px',lineHeight:'22px', textAlign:'right' }}>Company information.</Typography>
          </div>
        </headers>
      </div>

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
                      marginTop: '3px'
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
                      lineHeight: '22px',
                      marginTop: '10px'
                    }}
                  >
                    Already have an account? <NavLink to='/employlogin'> Log in</NavLink>
                  </Typography>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Form
                name="basic"
                style={{
                  position: 'relative !important',
                  left: '25% !important',
                  width: '50%',
                }}
                layout="vertical"
                initialValues={{
                  remember: true,
                  companyName: data.companyName,
                  companyAddress: data.companyAddress,
                  companyCategory: data.companyCategory,
                  companyEmail: data.companyEmail,
                  companyContactNo: data.companyContactNo
                }}
                data={data}
                // onSuccess={() => handleSubmit(data)}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Row gutter={6}>
                  <Col span={12}>
                    <Form.Item
                      label="Company"
                      name="companyName"
                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message: "Enter a valid text here"
                        },
                        {
                          min: 3,
                          message: 'Please write more than 3 letters'

                        }
                      ]}
                      hasFeedback
                    >
                      <Input
                        placeholder="Company Name"
                        className="Text-Field"
                        style={{ borderRadius: '10px' }}
                        value={data.companyName}
                        onChange={(e) =>
                          setData({ ...data, companyName: e.target.value },
                          )}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Company Email"
                      name="companyEmail"
                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message: "please enter your email"
                        },
                        {
                          type: "email", message: 'Please enter a valid email'

                        }
                      ]}
                      hasFeedback
                    >
                      <Input
                        placeholder="hello@company.com"
                        className="Text-Field"
                        style={{ borderRadius: '10px' }}
                        value={data.companyEmail}
                        onChange={(e) => setData({ ...data, companyEmail: e.target.value })}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Contact No"
                      name="companyContactNo"
                      className="phone-input-style"
                      rules={[
                        {
                          required: true,
                          message: "please enter your ContactNumber"
                        },
                        {
                          type: "Number", message: 'Please enter a valid Contact Number'
                        },
                        { min: 10 },
                        {
                          max: 11,
                          message: 'Please enter valid number'
                        }
                      ]}
                    >
                      {/* <Input
                        placeholder="03xxxxxxxxx , 051xxxxxxx, 021xxxxxxx"
                        className="Text-Field"
                        style={{ borderRadius: '10px' }}
                        maxLength={11}
                        value={data.companyContactNo}
                        onChange={(e) =>
                          setData({ ...data, companyContactNo: e.target.value })
                        }
                      /> */}
                      <PhoneNoInput 
                        phone={data.companyContactNo}
                        onChangePhone={onChangePhone}
                      />

                    </Form.Item>
                    <Form.Item
                      label="Category"
                      name="companyCategory"

                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message: "Enter a valid text here"
                        },
                        {
                          min: 3,
                          message: 'Please write more than 3 letters'

                        }
                      ]}
                      hasFeedback
                    >
                  <Select
                    showSearch
                    size="large"
                    className="companyCategory"
                    placeholder="Select a category"
                    allowClear
                    optionFilterProp="children"
                    value={data.companyCategory}
                    onChange={(value)=>{
                      setData({ ...data, companyCategory: value })}}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                      {
                        value: 'software',
                        label: 'Software',
                      },
                      {
                        value: 'furniture',
                        label: 'Furniture',
                      },
                      {
                        value: 'property',
                        label: 'Property',
                      },
                    ]}
                  />
                      {/* <Input
                        placeholder="Software, Furniture, Vehicles etc."
                        value={data.companyCategory}
                        className="Text-Field"
                        onChange={(e) =>
                          setData({ ...data, companyCategory: e.target.value })
                        }

                      /> */}

                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label="Address"
                  name="companyAddress"
                  rules={[
                    {
                      whitespace: true,
                      required: true,
                      message: "Enter a valid text here"
                    },
                    {
                      min: 6,
                      message: 'Please write more than 6 letters'

                    }
                  ]}
                  hasFeedback
                >
                  <Input
                    maxLength={70}
                    placeholder="Company Address"
                    className="Text-Field"
                    style={{ borderRadius: '10px' }}
                    value={data.companyAddress}
                    onChange={(e) =>
                      setData({ ...data, companyAddress: e.target.value })
                    }
                  />
                </Form.Item>
               
                {/* <div className="continue-button">
                  <Button type="primary" onClick={onSuccess} style={{ fontWeight: '700', fontSize: '20px', lineHeight: '32px' }}
                  >
                    Continue
                  </Button>
                </div> */}

                {/* AGREE TERMS CHECKBOX */}
                <Form.Item
                  wrapperCol={{
                    span: 16,
                  }}
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value ? Promise.resolve()
                          : Promise.reject(
                            "To proceed, you need to agree with our terms and conditions"
                          ),

                    },
                  ]}
                >
                  <Checkbox 
                    onChange={onChangeCheckBox}
                  >
                  </Checkbox>
                    <Typography variant="p" sx={{ fontSize: '16px', lineHeight: '24px', marginLeft: '10px' }}>
                      I agree to the <Link style={{ textDecoration: 'none' }}>term of services </Link>and <Link style={{ textDecoration: 'none' }}>privacy policy</Link>

                    </Typography>
                </Form.Item>

              <div className="continue-button text-center">
                  <Button type="primary" onClick={() => handleSubmit(data)}
                      style={{ fontWeight: '700', fontSize: '20px', lineHeight: '32px' }}
                    >
                      Submit
                    </Button>
                </div>
              </Form>
            </div>
          </div>
      {/* <div> */}
        {/* {step === 1 ?
          :
          <Personaldetails
            data={data}
            setData={setData}
            onSuccess={() => handleSubmit(data)}
            onBack={PrevStep}
          />
        } */}
      {/* </div> */}
    </div>
  );
};
export default Userregist;
