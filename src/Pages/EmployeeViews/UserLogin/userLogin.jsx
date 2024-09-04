import React,{useState} from 'react'
import { Typography } from "@mui/material";
import { Button, Checkbox, Form, Input } from "antd";
import { apiServices } from '../../../Services/apiServices';
import { Header, LoginForm } from "./userLoginStyle";
import {getSuccessinfo} from '../../../Redux/UserRedux/UserinfoSlice'
import { useDispatch } from 'react-redux';
// Auth
import useAuth from '../../../hooks/useAuth';
// Auth links
import { Link,useNavigate,useLocation,useParams,NavLink } from 'react-router-dom';
const UserLog= () => {
  // set Auth state from useAuth
    const {setAuth} = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location =useLocation();
    // const from =location.state?.from.pathname || "/";
    const [data,setData]=useState({
        email:'',
        password:'',
    })
    const onSubmit=(values)=>{
        try{
            let data= {
                email:values?.email,
                password:values?.password,
            };
            apiServices("POST","user/loginuser",data).then(res=>{
                if(res.data.success===true)
                {
                    const acesstoken= res?.data?.result?.access_token;
                    const role=res?.data?.result?.user.Role;
                    const name= res?.data?.result?.user.Name;
                    const {email,password}=data;

                    const data2={
                      email:email,
                      password:password,
                      name:name,
                      role:role,
                      acesstoken:acesstoken,
                    }
                    
                    localStorage.setItem("AuthObj",JSON.stringify(data2))
                    setAuth({email,password,name,role,acesstoken});
                    dispatch(getSuccessinfo(res?.data))
                  
                    // localStorage.setItem("Token",JSON.stringify(acesstoken))
              //  employee review
                    alert(`Employee logged in ${res?.data.result.user.Role}`);
                    role =="Employee" ?
                    navigate('/attends', { state: res?.data} ,{replace:true})
                    :
                    role=="CTO" ?
                    navigate('/ctoroute', { state: res?.data} ,{replace:true})
                    :
                    navigate('/userLogin', { state: res?.data} ,{replace:true})

                    // navigate('/emp' || '/', { state: res?.data} ,{replace:true})
                }
            })
        }
        catch(error){
        }
    }
  return (
    <div className="mt-5">
<Header>
<div className="row mt-5">
        <div className="col-lg-12">
          <div className="Login_Form">
            <Typography
              variant="p"
              sx={{
                fontSize: "24px",
                fontStyle: "normal",
                letterSpacing: "0.5px",
              }}
            >
              User Login!
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontStyle: "normal",
                fontSize: "42px",
                fontFamily: "Open Sans",
                lineHeight: "33px",
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
                lineHeight: "33px"
              }}
            >
              Don’t have an account? <NavLink to='/superadmin'>SignUp</NavLink>
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
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          data={data}
         
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="username"
            rules={[
              {
                required: false,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              className="Text-Field"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: false,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              className="Text-Field"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <div className="continue-button1">
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => onSubmit(data)}
              style={{ fontWeight: '700', fontSize: '20px', lineHeight: '32px' }}
            >
              Login
            </Button>
          </div>
        </Form>
      </LoginForm>
    </div>
  )
}
export default UserLog