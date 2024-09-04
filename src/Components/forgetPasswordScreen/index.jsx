import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Button, Form, Input, message, Spin, } from "antd";
import "../Login/style.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import { Header, LoginForm } from "../Login/LoginStyle";
import { LoadingOutlined } from '@ant-design/icons';
import { useLocation } from "react-router-dom";
import Preview from '../../Assets/images/Side_View.png'
import { apiServices } from "../../Services/apiServices";
import tick from '../../Assets/images/tick.png'
import './style.css'

const ForgetPassword = () => {
    // const { setAuth } = useAuth();
    const location = useLocation();

    const [data, setData] = useState({
        email: "",
    });
    const [emailSent, setEmailSent] = useState(false)
    const [loader, setloader] = useState(false)
    const navigate = useNavigate();
    const onSubmit = (values) => {
        setloader(true)
        let data = {
            email: values?.email,
        };
        console.log("onSubmit Email", values);
        apiServices("POST", "user/forgotpassword", data).then((res) => {
           setloader(false)
            setEmailSent(true)
        }).catch((err)=>{
            setloader(false)
            message.error(`${err.response.data.msg ? err.response.data.msg :"API FAILED!"}`)
        })
    };

    const antIcon = (
        <LoadingOutlined
            style={{
                fontSize: 24,
                color: '#fff'
            }}
            spin
        />
    );


    return (
            <div className="container-fluid">
                <div className="row" style={{ height: "100vh" }}>
                    <div className="col-4 bg-primary"
                        style={{
                            padding: '0px',
                            background: "#0098C9",
                        }}
                    >
                        <p style={{ position: "absolute", top: '37%', width: '17%', left: '9%', color: '#fff' }}>
                        Implementing an DaftarPro can help increase efficiency and reduce errors in HR processes
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
                    <div className="col-8" style={{paddingTop: '6%'}}>
                    {emailSent
                        ?
                        <div className="email-sent">
                            <div>
                                <img src={tick} alt="tick"/>
                            </div>
                            <Typography variant="h4" sx={{ fontSize: "40px", mt: "10px" }}>
                                Reset Email has been sent
                            </Typography>
                            <Typography

                                sx={{ mt: "4px", fontSize: "14px", color: '#0098c9' }}
                            >
                                Please visit your mail to reset password.
                            </Typography>
                        </div>
                        :
                        <>
                            <Header>
                                <div className="row mt-5">
                                    <div className="col-lg-12">
                                        <div className="Login_Form">
                                            <Typography
                                                variant="h4"
                                                sx={{
                                                    fontWeight: 800,
                                                        fontStyle: "normal",
                                                        fontSize: "42px",
                                                        marginTop: '3px'
                                                    }}
                                            >
                                                Forget Password
                                            </Typography>
                                            <Typography
                                                variant="span"
                                                sx={{
                                                    fontStyle: "normal",
                                                    fontWeight: "700",
                                                    fontSize: "14px",
                                                    lineHeight: "33px"
                                                }}
                                            >
                                                Don’t have an account?
                                                {/* <NavLink to='/superadmin'>SignUp</NavLink> */}
                                                <NavLink to='/registration'> SignUp</NavLink>
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </Header>
                            <LoginForm>
                                    <Form
                                            name="basic"
                                            style={{
                                                position: 'relative !important',
                                                left: '25% !important',
                                                width: '50%',
                                            }}
                                            layout="vertical"
                                            data={data}
                                            autoComplete="off"
                                        >
                                            <Form.Item
                                                label="Email"
                                                name="username"
                                                rules={[
                                                    {
                                                        type: 'email',
                                                        required: true,
                                                        message: "Please input your Email!",
                                                    }
                                                ]}
                                            >
                                                <Input
                                                    className="Text-Field"
                                                    value={data.email}
                                                    onChange={(e) => setData({ email: e.target.value })}
                                                    style={{borderRadius: '10px'}}
                                                />
                                            </Form.Item>

                                            <div className="continue-button1" style={{ textAlign: 'center' }}>
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                    onClick={() => onSubmit(data)}
                                                    style={{ fontWeight: '700', fontSize: '20px', lineHeight: '32px', width: '100%', marginTop: '15px' }}
                                                >
                                                    {loader
                                                        ? <Spin size="small" indicator={antIcon} />
                                                        : <span>Send Email</span>
                                                    }
                                                </Button>
                                            </div>
                                    </Form>
                            </LoginForm>
                        </> 
                    } 
                    </div>
                </div>
            </div>

    );
};

export default ForgetPassword;
