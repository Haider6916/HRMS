import React, { useState } from 'react'
import { Typography, Paper, Button } from '@mui/material';
import Barchart from '../../../Components/charts/Barchart';
import { theme } from '../../../themes/ColorPallete';
import "./admoverviewStyle.css"
import Reject from "../../../Assets/Icons/Reject.png"
import Accept from "../../../Assets/Icons/Accept.png"
import { List, Tabs } from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import { useEffect } from 'react';
import { apiServices } from '../../../Services/apiServices';
import moment from "moment"



const Admin_overview = () => {

    const [adminActivitylog, setActivityLog] = useState({});
    useEffect(() => {
        getActivityLog()
    }, [])


    const getActivityLog = () => {
        apiServices("GET", "requests/").then(res => {
            setActivityLog(res?.data?.Request)
        }
        )
    }


    return (
        <div className="container-fluid">


            <div className="admin_overview_top">
                <div className="col-12 col-md-12 col-lg-6 Section">
                    <Typography
                        variant="h4"
                        sx={{
                            color: '#000',
                            marginBottom: '60px',
                        }}
                        key={Math.random()}
                    >
                        Admin
                        <Typography
                            variant="span"
                            sx={{
                                color: `${theme.palette.secondary.main}`,
                                fontSize: '20px',
                                fontWeight: 700,
                            }}
                        >
                            / Admin
                        </Typography>
                        <Button variant='outlined' disabled sx={{ borderRadius: '37px', fontWeight: 800, color: "rgba(4, 9, 33, 0.6)", marginLeft: '10px' }}>Permanent</Button>
                    </Typography>
                    <div className='row'>
                        <div className='col-12 col-md-4 col-lg-4'>
                            <Typography variant="p" sx={{ color: 'rgba(0, 0, 0, 0.65)' }}>TEAM</Typography>
                            <br></br>
                            <Typography variant="h6" sx={{ color: 'rgba(0, 0, 0, 0.65)' }}>Administration</Typography>
                            <br></br>
                            <Typography variant="p" sx={{ color: 'rgba(0, 0, 0, 0.65)' }}>SHIFT TIMINGS</Typography>
                            <br></br>
                            <Typography variant="h6" sx={{ color: 'rgba(0, 0, 0, 0.65)' }}>9AM - 7PM</Typography>
                            <br />
                            <Typography variant="p" sx={{ color: 'rgba(0, 0, 0, 0.65)' }}>TEAM LEAD</Typography>
                            <br></br>
                            <Typography variant="h6" sx={{ color: 'rgba(0, 0, 0, 0.65)' }}> Amna Qasim</Typography>
                        </div>
                        <div className='col-12 col-lg-8 col-md-4'>
                            <Barchart />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3 Attends">
                    {/* Attendence aside */}
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '20px',
                            fontWeight: 700,
                            marginBottom: '20px',
                        }}
                    >
                        Attendance
                    </Typography>
                    {/* Attendence Content Section 1 */}
                    <div className='mb-2'>
                        <Typography variant="p" sx={{ color: 'rgba(0, 0, 0, 0.65)', mb: '30px' }}>TODAY</Typography>
                        <Paper elevation={0}
                            sx={{
                                padding: '10px 15px 0px 15px',
                                borderRadius: "10px",
                                mt: '5px',
                                background: 'rgba(0, 152, 201,0.1)',


                            }}>
                            <div className='row'>
                                <div className='col-12 col-md-6 col-lg-6' style={{ borderRight: " 0.5px solid rgba(0, 0, 0, 0.2)" }}>
                                    <Typography variant="p" >CHECK IN</Typography>
                                    <br></br>
                                    <Typography variant="p" sx={{ fontSize: "20px", fontWeight: 800 }}>10:39 <Typography variant='span'>Am</Typography></Typography>

                                </div>
                                <div className='col-12 col-md-6 col-lg-6'>
                                    <Typography variant="p">CHECK OUT</Typography>
                                    <br />
                                    <Typography variant="p" sx={{ fontSize: "20px", fontWeight: 800 }}> --:--<Typography variant='span'>Pm</Typography></Typography>
                                </div>
                            </div>


                        </Paper>
                    </div>
                    {/* Attendence Content Section 2 */}
                    <Typography variant="p" sx={{ color: 'rgba(0, 0, 0, 0.65)', mb: '30px' }}>THIS MONTH</Typography>
                    <Paper elevation={0}
                        sx={{
                            padding: '15px 15px 15px 15px',
                            borderRadius: "10px",
                            mt: '5px',
                            background: 'rgba(0, 152, 201,0.1)',

                        }}>
                        <div className='row mb-3'>
                            <div className='col-12 col-md-6 col-lg-6' style={{ borderRight: " 0.5px solid rgba(0, 0, 0, 0.2)" }}>
                                <Typography variant="p" >LEAVES ALLOTED</Typography>
                                <br></br>
                                <Typography variant="p" sx={{ fontSize: "20px", fontWeight: 800 }}>8</Typography>

                            </div>
                            <div className='col-12 col-md-6 col-lg-6'>
                                <Typography variant="p">SICK LEAVES</Typography>
                                <br />
                                <Typography variant="p" sx={{ fontSize: "20px", fontWeight: 800 }}>1</Typography>
                            </div>
                        </div>
                        <div className='row '>

                            <div className='col-12 col-md-6 col-lg-6' style={{ borderRight: " 0.5px solid rgba(0, 0, 0, 0.2)" }}>
                                <Typography variant="p" >CASUAL LEAVES</Typography>
                                <br></br>
                                <Typography variant="p" sx={{ fontSize: "20px", fontWeight: 800 }}>2</Typography>


                            </div>
                            <div className='col-12 col-md-6 col-lg-6' style={{ borderRight: " 0.5px solid rgba(0, 0, 0, 0.2)" }}>
                                <Typography variant="p">REMAINING LEAVES</Typography>
                                <br />
                                <Typography variant="p" sx={{ fontSize: "20px", fontWeight: 800 }}>6</Typography>
                            </div>
                        </div>


                    </Paper>
                </div>
                <div className="col-12 col-md-12 col-lg-3 companyPolicy">
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '20px',
                            fontWeight: 700,
                        }}
                    >
                        Company Policies
                    </Typography>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

                        <Button variant='text' sx={{ color: `${theme.palette.primary.main}` }}>Rules & Regulations</Button>
                        <Button variant='text'>Leave & Late Arrival Policies</Button>
                        <Button variant='text'>Intellectual Property & NDAs</Button>
                    </div>

                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '20px',
                            fontWeight: 700,
                            mt: '10px'
                        }}
                    >
                        Download Forms
                    </Typography>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Button variant='text'>Evaluation Form</Button>
                        <Button variant='text'>Exit Form</Button>
                        <Button variant='text'>Appraisal Form</Button>
                    </div>
                </div>
            </div>
            {/* Activity Log */}
            <div className='admin_ActivityLog'>
                <div style={{ display: 'flex' }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: '20px',
                            fontWeight: 700,
                        }}
                    >
                        Activity log
                    </Typography>
                    <Button variant='text' sx={{ marginLeft: 'auto' }}> See all</Button>
                </div>
                {/* Activity Log */}

                <div className='row'>
          {adminActivitylog?.docs?.map((req) => {
            return (
              <>
                <div className='Log'>
                  <div className='col-12 col-md-6 col-lg-6'>
                    <p className='para'>{req?.requestType}</p>

                  </div>
                  <div className='col-12 col-md-3 col-lg-3'>
                    <p className={req?.status=='Pending' ? 'Approved' : req?.status=='Reject'?'status':req?.status=='pending'?'status':''}>{req?.status}</p>

                  </div>
                  <div className='col-12 col-md-3 col-lg-3'>
                    <p className='date'>{moment(req?.createdAt).format('l h:mm a')}</p>

                  </div>

                    </div>
                  <div className='margin_bottom'></div>
                    </>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default Admin_overview