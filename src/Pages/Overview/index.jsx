import React, { useEffect, useState } from 'react'
import { theme } from '../../themes/ColorPallete';

import { Typography, Paper, Button } from '@mui/material';
import Barchart from '../../Components/charts/Barchart';
import { apiServices } from '../../Services/apiServices';
import "./overViewstyle.css"
import moment from 'moment';
import { Empty, Skeleton } from 'antd';
import {ReactComponent as LinkRedirectIcon} from '../../Assets/Icons/linkRedirect.svg'

const OverviewPage = () => {
  const [activityLog, setactivityLog] = useState({})
  const [overviewState, setOverview] = useState({
    GraphAttendance: [
      {
        _id: '',
        hoursWorked: ''

      }
    ],
    userAttendance: {
      checkIn: '',
      checkOut: '',
    },
    User: {
      userName: '',
      teamName: '',
      teamLead: '',
      shift: ''
    },
    Month: {
      leavesAlloted: '',
      sickLeaves: '',
      casualLeaves: '',
      remainingLeaves: ''
    }
  })
  const [loading, setloading] = useState(true)
  let AuthObj = JSON.parse(localStorage.getItem('AuthObj'));
  let userID = AuthObj?.userId;

  useEffect(() => {
    graphAttends();
    getActivityLogs();
  }, [])


  //  GET rEQUEST
  const getActivityLogs = ()=>{
    apiServices("GET", `/requests/viewselfrequest/?page=1&limit=10`)
      .then(res => {
        console.log("respppppp-===>", res.data.SelfRequests);
        setactivityLog(res.data.SelfRequests)
      }).catch((err) => {
          console.log("Err Activity logs===>", err)
      })
  }
  //  const graph Attends
  const graphAttends = () => {
    apiServices("GET", `attendance/graphattendance/?_id=${userID}`).then(res => {
      setOverview({ ...res?.data })
      setloading(false)
    }).catch((err)=>{
      setloading(false)
    })
  }


  return (
      <div>
          {loading
            ?
            <div className='mt-5 pt-5'>
              <div className='mt-5 pt-5'>
                <Skeleton active/>
              </div>
              <div className='mt-5 pt-5'>
                <Skeleton active/>
              </div>
            </div>
            :
            <>
             <div className="container-page">
                <div className="overview_group_top">
                  <div className="Section1">
                    <p
                      style={{
                        color: '#000',
                        // marginBottom: '60px',
                        fontSize: "20px",
                        fontWeight: "700"
                      }}
                      key={Math.random()}
                    >
                      {overviewState?.User?.userName}
                      {/* {overViewScreen?.userInfo?.result?.user?.Name} */}
                      <span
                        style={{
                      color: `rgba(0, 0, 0, 0.5)`,
                          fontSize: '15px',
                          fontWeight: 600,
                          marginLeft: '5px'
                        }}
                      >
                        /{overviewState?.User?.position}
                      </span>
                      <Button variant='outlined' disabled 
                          sx={{ 
                            fontSize: "12px", 
                            borderRadius: '37px', 
                            color: "rgba(0, 0, 0, 0.5) !important", 
                            marginLeft: '10px', 
                            border: '2px solid rgb(0 0 0 / 28%) !important',
                            padding: '2px 10px'
                          }}
                      >Permanent</Button>
                    </p>

                    <div className='row mt-5'>
                      <div className='col-12 col-md-4 col-lg-4 mt-3'>
                        <div>
                          <p 
                            className='overview_sec_heading'
                          >TEAM</p>
                          <p
                            style={{
                              fontWeight: '700',
                              color: 'rgba(0, 0, 0, 0.65)',
                              fontSize:'16px'
                            }}
                          >{overviewState?.User?.teamName ? overviewState?.User?.teamName : ''}</p>
                        </div>
                        <div>
                          <p
                            className='overview_sec_heading'
                          >SHIFT TIMINGS</p>
                          <p
                            style={{
                              fontWeight: '700',
                              color: 'rgba(0, 0, 0, 0.65)',
                              fontSize: '16px'
                            }}
                          >{overviewState?.User?.shift ? overviewState?.User?.shift : '-- : -- '}</p>
                        </div>
                        <div>
                      {(AuthObj.role === "CEO")
                        ?
                        null
                        :
                        <>
                            <p
                              className='overview_sec_heading'
                            >REPORTS TO</p>
                            <p
                              style={{
                                fontWeight: '700',
                                color: 'rgba(0, 0, 0, 0.65)',
                                fontSize: '16px'
                              }}
                            >{overviewState?.User?.teamLead ? overviewState?.User?.teamLead : ''}</p>
                        </>

                          }
                        </div>

                      </div>
                      <div className='col-12 col-lg-8 col-md-4'>
                        <div className='status_graph_container'>
                          <p className='status_graph_title'>
                            {/* green color = #38CB89, blue color = #0098C9, orange color = #FFA600, red color =#FF5630 */}
                            <span 
                                  style={{
                                    fontSize: '40px',
                                    color: '#38CB89',
                                    lineHeight: '0',
                                    marginBottom:'6px',
                                  }}
                                > • </span> 
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontFamily: 'Open Sans',
                                    fontWeight: '600'
                                  }}
                            > On leave </span>
                          </p>

                        <p className='status_graph_title'>
                              <span
                                style={{
                                  fontSize: '40px',
                                  color: '#0098C9',
                                  lineHeight: '0',
                                  marginBottom:'6px'
                                }}
                              > • </span> 
                              <span
                                style={{
                                    fontSize: "12px",
                                    fontFamily: 'Open Sans',
                                    fontWeight: '600'
                                }}
                              > Present </span>
                        </p>
                        <p className='status_graph_title'>
                              <span
                                  style={{
                                    fontSize: '40px',
                                    color: '#FFA600',
                                    lineHeight: '0',
                                    marginBottom:'6px'
                                  }}
                              > • </span> 
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontFamily: 'Open Sans',
                                  fontWeight: '600'
                                }}
                              > Late </span> 
                          </p>
                          <p className='status_graph_title'>
                            <span
                              style={{
                                fontSize: '40px',
                                color: '#FF5630',
                                lineHeight: '0',
                                marginBottom:'6px'
                              }}
                            > • </span>
                            <span
                              style={{
                                fontSize: "12px",
                                fontFamily: 'Open Sans',
                                fontWeight: '600'
                              }}
                            > Absent </span>
                         </p>
                        </div>
                        <Barchart
                          overviewState={overviewState}
                        // GraphAttendance={GraphAttendance}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="Attends1">
                    {/* Attendenc3e aside */}
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: '20px',
                        fontWeight: 700,
                        marginBottom: '15px',
                        // padding: '30px 0px 0px 10px'
                      }}
                    >
                      Attendance
                    </Typography>
                    {/* Attendence Content Section 1 */}
                    <div className='mb-2'>
                      <p className='overview_sec_heading'
                        style={{marginLeft: '10px'}}
                      >TODAY</p>
                      <Paper elevation={0}
                        sx={{
                          padding: '10px 15px 10px 15px',
                          borderRadius: "10px",
                          mt: '5px',
                          background: 'rgba(0, 152, 201,0.1)',
                        }}>
                        <div className='row'>
                          <div className='col-12 col-md-6 col-lg-6' style={{ borderRight: " 0.5px solid rgba(0, 0, 0, 0.2)" }}>
                            <p className='overview_sec_heading'>CHECK IN</p>
                        <Typography variant="p" sx={{ fontSize: "16px", fontWeight: 800 }}>{(overviewState?.userAttendance?.checkIn !== "Invalid date" && overviewState?.userAttendance?.checkIn !== "") ? moment(overviewState?.userAttendance?.checkIn).format(' hh:mm A') : "--:--"} </Typography>
                          </div>
                          <div className='col-12 col-md-6 col-lg-6'>
                            <p className='overview_sec_heading'>CHECK OUT</p>
                        <Typography variant="p" sx={{ fontSize: "16px", fontWeight: 800 }}>{(overviewState?.userAttendance?.checkOut !== "Invalid date" && overviewState?.userAttendance?.checkOut !== "") ? moment(overviewState?.userAttendance?.checkOut).format(' hh:mm A') : "--:--"} </Typography>
                          </div>
                        </div>
                      </Paper>
                    </div>
                    {/* Attendence Content Section 2 */}
                    <p className='overview_sec_heading mt-4' style={{ marginLeft: '10px' }}>THIS MONTH</p>
                    <Paper elevation={0}
                      sx={{
                        padding: '15px 15px 15px 15px',
                        borderRadius: "10px",
                        mt: '5px',
                        background: 'rgba(0, 152, 201,0.1)',

                      }}>
                      <div className='row mb-3'>
                        <div className='col-12 col-md-6 col-lg-6' style={{ borderRight: " 0.5px solid rgba(0, 0, 0, 0.2)" }}>
                          <p className='overview_sec_heading' >LEAVES ALLOTED</p>
                      <Typography variant="p" sx={{ fontSize: "17px", fontWeight: 800 }}>{overviewState?.Month?.leavesAlloted !== "NaN" ? overviewState?.Month?.leavesAlloted : "0"}</Typography>

                        </div>
                        <div className='col-12 col-md-6 col-lg-6'>
                          <p className='overview_sec_heading'>SICK LEAVES</p>
                      <Typography variant="p" sx={{ fontSize: "17px", fontWeight: 800 }}>{overviewState?.Month?.sickLeaves !== "NaN" ? overviewState?.Month?.sickLeaves : "0"}</Typography>
                        </div>
                      </div>
                      <div className='row '>

                        <div className='col-12 col-md-6 col-lg-6' style={{ borderRight: " 0.5px solid rgba(0, 0, 0, 0.2)" }}>
                          <p className='overview_sec_heading'  >CASUAL LEAVES</p>
                      <Typography variant="p" sx={{ fontSize: "17px", fontWeight: 800 }}>{overviewState?.Month?.casualLeaves !== "NaN" ? overviewState?.Month?.casualLeaves : "0"}</Typography>


                        </div>
                        <div className='col-12 col-md-6 col-lg-6'>
                          <p className='overview_sec_heading' >REMAINING LEAVES</p>
                      <Typography variant="p" sx={{ fontSize: "17px", fontWeight: 800 }}>{overviewState?.Month?.remainingLeaves !== "NaN" ? overviewState?.Month?.remainingLeaves : "0"}</Typography>
                        </div>
                      </div>


                    </Paper>
                  </div>
                  <div className="companyPolicy1">
                    <div className='d-flex'>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: '20px',
                        fontWeight: 700,
                        marginBottom: '10px',
                        float: 'left'
                      }}
                    >
                      Company Policies
                    </Typography>
                    <LinkRedirectIcon style={{marginLeft: 'auto', marginTop: '4px'}} width="18px" height="18px" />
                    </div>
                    <div 
                    // style={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline', textAlign: 'justify' }}
                    >

                      <p className='overview_links'>Rules & Regulations</p>
                      <p className='overview_links'>Leave & Late Arrival Policies</p>
                      <p className='overview_links'>Intellectual Property & NDAs</p>
                    </div >
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: '20px',
                        fontWeight: 700,
                        mt: '30px',
                        marginBottom: '10px'
                      }}
                    >
                      Download Forms
                    </Typography>
                    <div 
                    // style={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline', textAlign: 'justify' }}
                    >
                      <p className='overview_links'>Evaluation Form</p>
                      <p className='overview_links'>Exit Form</p>
                      <p className='overview_links'>Appraisal Form</p>
                    </div>
                  </div>
                </div>

                <div className='ActivityLog'>
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
                  {/* activity log 1 */}
              {activityLog?.docs?.length > 0
                ?
                <>
                  <div 
                    className='activityLogs' 
                   
                  >
                    {activityLog?.docs?.map((req) => {
                      return (
                        // description
                        <>
                          <div className='Log'>
                            <div className='col-12 col-md-3 col-lg-1 '>
                              <p className='para' style={{textTransform: 'uppercase', fontWeight: '600', marginRight: '10px'}}>{req?.requestType}</p>
                            </div>
                            <div className='col-12 col-md-3 col-lg-8 decspara'>
                              <p className='para desc'
                              >{req?.description}</p>
                            </div>
                            <div className='col-12 col-md-3 col-lg-1'>
                              <p className={req?.status === 'Pending' ? 'pending' : req?.status === 'Approved' ? 'Approved' : 'Reject'}><span style={{fontSize: '11px', verticalAlign: 'top'}}>⬤</span>  {req?.status}</p>

                            </div>
                            <div className='col-12 col-md-3 col-lg-2'>
                              <p className='date'>{moment(req?.createdAt).format('l h:mm a')}</p>

                            </div>

                          </div>
                          <div className='margin_bottom'></div>
                        </>
                      )
                    })}
                  </div>
                </>
                :
                <div>
                  <Empty />
                </div>
                 } 
                </div>
              </div>
            </>
            }
          </div>
          
  )
}

export default OverviewPage