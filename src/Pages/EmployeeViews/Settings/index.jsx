import { Typography } from '@mui/material'
import React, { useState } from 'react'
import './style.css'
import { Button, Form, Input, message } from 'antd';
import { apiServices } from '../../../Services/apiServices';

const Setting = () => {

    const [form] = Form.useForm();

    const onFinish = (values) => {
        // console.log('Received values of form: ', values);
        apiServices("PUT", "admin/changepassword", 
            { password: values.password , newPassword: values.newpassword}).then((res) => {
            if (res.data.success)
                message.success("User Password Updated!")
        }).catch((err)=>{
            console.log(err);
            message.error(`${err.response.data.msg}`)
        })
    };

  return (
    <div className='settings-card'>
         <Typography className='heading' variant='h5'>Change password</Typography>
        <Form
              form={form}
              onFinish={onFinish}
              name="settings"
        >
            <div className='mt-3'>
                    <Typography className='mb-2 mt-5' style={{ fontFamily: 'Open Sans', fontSize: '15px' }}>
                        <span style={{ color: 'red' , marginRight:'5px'}}>*</span>
                        Old Password
                    </Typography>
                  <Form.Item
                    name="password"
                      rules={[
                          {
                              required: true,
                              message: 'Please input old password!',
                          },
                          {
                            min: 8,
                            message: 'Password length should be minimun 8'
                          }
                      ]}
                      hasFeedback
                  >
                      <Input.Password 
                          style={{
                              borderRadius: '5px', width:'45%'
                          }} 
                          maxLength={16}
                      />
                  </Form.Item>

            </div>
            <div className='mt-3'>
                <Typography className='mb-2' style={{ fontFamily: 'Open Sans', fontSize: '15px' }}>
                        <span style={{ color: 'red' , marginRight:'5px'}}>*</span>
                        New Password
                    </Typography>
                  <Form.Item
                      name="newpassword"
                      rules={[
                          {
                              required: true,
                              message: 'Please input new password!',
                          },
                          {
                              min: 8,
                              message: 'Password length should be minimun 8'
                          }
                      ]}
                      hasFeedback
                      
                  >
                    <Input.Password 
                        style={{
                          borderRadius: '5px', width:'45%'
                        }}
                        maxLength={16}
                    />
                  </Form.Item>
            </div>
            <div className='mt-3'>
                <Typography className='mb-2' style={{ fontFamily: 'Open Sans', fontSize: '15px' }}>
                        <span style={{ color: 'red' , marginRight:'5px'}}>*</span>
                        Confrim New Password
                    </Typography>
                  <Form.Item
                      name="confirm"
                      dependencies={['newpassword']}
                      hasFeedback
                      rules={[
                          {
                              required: true,
                              message: 'Please confirm your password!',
                          },
                          ({ getFieldValue }) => ({
                              validator(rule, value) {
                                  if (!value || getFieldValue('newpassword') === value) {
                                      return Promise.resolve();
                                  }
                                  return Promise.reject('The two passwords that you entered do not match!');
                              },
                          }),
                      ]}
                  >
                      <Input.Password 
                          style={{
                              borderRadius: '5px', width:'45%'
                          }} 
                          maxLength={16}
                      />
                  </Form.Item>
            </div>
            <Form.Item>
                <Button 
                    style={{
                        borderRadius: '16px',
                        marginTop: '20px',
                        background:'#E4E4E4'
                    }}
                    htmlType="submit"
                >
                    Save
                </Button>
            </Form.Item>
        </Form>
    </div>
  )
}

export default Setting