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

const ResetPassword = () => {
    const location = useLocation();
    const token = location.pathname.split("/")[2]

    const [data, setData] = useState({
        password: "",
    });
    const [loader, setloader] = useState(false)
    const navigate = useNavigate();
    const onSubmit = (values) => {
        setloader(true)
        let data = {
            password: values?.password,
        };
        apiServices("PUT", `user/resetpassword?token=${token}`, data).then((res) => {
            setloader(false)
                message.success("Password have been reset!")
                navigate("/employlogin")
        }).catch((err)=>{
            message.error("Password reset failed!")
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
                        DaftarPro can provide valuable insights and data for decision-making and strategic planning.
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
                <div className="col-8" style={{paddingTop: '6%'}}>
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
                                    Update Password
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
                                label="New Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                    { min: 8, message: "Password length should be greater than 8!" },
                                ]}
                            >
                                <Input
                                    className="Text-Field"
                                    value={data.password}
                                    maxLength={16}
                                    onChange={(e) => setData({ password: e.target.value })}
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
                                        : <span>Reset</span>
                                    }
                                </Button>
                            </div>
                        </Form>
                    </LoginForm>
                </div>
            </div>
        </div>

    );
};

export default ResetPassword;
