import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Button, Form, Input, message, Spin, } from "antd";
import "../Login/style.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import { Header, LoginForm } from "./LoginStyle";
// authorizations
// import useAuth from "../../hooks/useAuth";
import { LoadingOutlined } from '@ant-design/icons';
import { useLocation } from "react-router-dom";
import { apiLoginEmployee } from "../../Services/apiLogin";
import "./style.css";
import { apiServices } from "../../Services/apiServices";


const Login = () => {
  // const { setAuth } = useAuth();
  const location = useLocation();

  let verificationToken = location.pathname.split('/')[2]?.split('&token=')[1]
  let verificationEmail = location.pathname.split('/')[2]?.split('&token=')[0]

  const [resendEmail, setresendEmail] = useState(false)

  const [loader, setloader] = useState(false)

  const [data, setData] = useState({
    email: verificationEmail ? verificationEmail : "",
    password: "",
    role: '',
    companyID: ''
  });
  const navigate = useNavigate();
  const onSubmit = (values) => {
    setloader(true)
    let data = {
      token: verificationToken,
      email: values?.email,
      password: values?.password,
    };

    apiLoginEmployee(data).then((res) => {
      if (res?.data?.success === true) {
        if (res?.data?.result?.user?.role === 'Admin') {
          let acesstoken = res?.data?.result?.access_token;
          const role = res?.data?.result?.user?.role;
          const id = res?.data?.result?.user?._id;
          const companyID = res?.data?.result?.user.companyID;
          const { email, password } = data;
          const adminLogin = {
            email: email,
            userId: id,
            password: password,
            role: role,
            acesstoken: acesstoken,
            companyID: companyID,
            img: res?.data?.result?.user?.image
          }
          localStorage.setItem("AuthObj", JSON.stringify(adminLogin));
          navigate('/management' || '/', { replace: true });
          setloader(false)
        }
        else {
          localStorage.clear("AuthObj")
          const name = res?.data?.result?.user?.name;
          const role = res?.data?.result?.user?.role;
          const companyID = res?.data?.result?.user?.companyID;
          const acesstoken = res?.data?.result?.access_token;
          const id = res?.data?.result?.user?._id;
          const { email, password } = data;
          const employLogin = {
            name: name,
            userId: id,
            email: email,
            password: password,
            role: role,
            acesstoken: acesstoken,
            companyID: companyID,
            img: res?.data?.result?.user?.image
          }
          localStorage.setItem("AuthObj", JSON.stringify(employLogin))
          if (res?.data?.result?.user?.firstTimeLogin) {
            navigate('/emp-settings')
          } else {
            navigate('/overview')
          }
        }
      } else {
        setloader(false)
        message.error("Login Error!")
      }
    }).catch((err) => {
      if (err.response.data.verified === false) {
        setresendEmail(true)
      }
      setloader(false)
      message.error(`${err.response.data.msg ? err.response.data.msg : err.response.data.validation.body.message}`)
    })
  };

  const onEmailSend = () => {
    apiServices("PUT", 'user/resendverificationmail', {
      email: data.email
    }).then((res) => {
      message.success(`${res.data.msg}`)
    }).catch((err) => {
      message.error('Resend verification email failed!')
    })

  }

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
    <div>
      <Header>
        <div className="row mt-5">
          <div className="col-lg-12">
            <div className="Login_Form">
              <Typography
                variant="p"
                sx={{
                  fontSize: "24px",
                  lineHeight: "33px",
                  fontStyle: "normal",
                  letterSpacing: "0.5px",
                }}
              >
                Welcome Back!
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
                Login to continue
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
          className="inpDesign"
          initialValues={{
            email: data.email
          }}
        >
          <Form.Item
            label="Email"
            name="email"
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
              onChange={(e) => setData({ ...data, email: e.target.value })}
              style={{ borderRadius: '10px' }}
              disabled={verificationEmail ? true : false}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              { min: 8, message: "Password length shloud be greater than 8!", },
            ]}
          >
            <Input.Password
              className="Text-Field"
              value={data.password}
              maxLength={16}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              style={{ borderRadius: '10px' }}
            />
          </Form.Item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {resendEmail
                ?
                <p style={{ color: 'rgba(0, 152, 201, 1)', fontWeight: '400', cursor: "pointer", fontSize: '18px' }}
                  onClick={() => {
                    onEmailSend()
                  }}
                >  <span> Resend Email </span> </p>
                :
                <p
                  style={{
                    width: '50%'
                  }}
                ></p>
              }
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}
              onClick={() => { navigate("/forgetpassword") }}
            >
              <p style={{ color: 'rgba(0, 152, 201, 1)', fontWeight: '400', cursor: "pointer", fontSize: '18px' }}>Forgot Password?</p>
            </div>
          </div>

          <div className="continue-button1" style={{ textAlign: 'center' }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => onSubmit(data)}
              style={{ fontWeight: '700', fontSize: '20px', lineHeight: '32px', width: '100%', marginTop: '15px' }}
            >
              {loader
                ? <Spin size="small" indicator={antIcon} />
                : <span>Login</span>
              }
            </Button>
          </div>
        </Form>
      </LoginForm>


    </div>

  );
};

export default Login;