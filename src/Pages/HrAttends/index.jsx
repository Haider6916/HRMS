import React, { useState, useEffect } from 'react'
import { Table, Input } from 'antd';
import { Attends_Header, Attends_Table, Present, Section } from './AttendanceStyle'
import { Typography, Select, InputLabel } from '@mui/material'
import Presenticon from '../../Assets/Icons/Presenticon.png'
import Absent_icon from '../../Assets/Icons/Absent_icon.png'
import { apiServices } from '../../Services/apiServices';
import moment from "moment"
import './style.css'
import TextField from '@mui/material/TextField';

const HrempAttends = () => {
    const [hrempAttends, sethrempAttends] = useState()
    useEffect(() => {
        getEmpAttendance()
    }, [])


    const getEmpAttendance = (page)=>{
        if(page){
            apiServices("GET", `attendance/employeesattendance/?page=${page}&limit=10`).then(res => {
                sethrempAttends(res?.data?.Attendance)
            })
        }else{
            apiServices("GET", `attendance/employeesattendance/?page=${1}&limit=10`).then(res => {
                sethrempAttends(res?.data?.Attendance)
            })
        }
    }

    const columns = [
        {
            title: 'NAME',
            dataIndex: 'userId',
            key: 'name',
            render: (record) => {
                return (
                    <span>
                        <strong>{record?.employeeName}</strong>
                    </span>
                )
            }

        },
        {
            title: 'DATE',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (record) => {
                return (
                    <span>
                        {record ? moment(record).format('DD-MM-YYYY') : ''}
                    </span>
                )
            }
        },
        {
            title: 'CHECK IN',
            dataIndex: 'checkInTime',
            key: 'checkin',
            render: (record) => {
                return (
                    <span>
                      {record ? moment(record).format(' hh:mm A') : '-- : --'}
                    </span>
                )
            }
        },
        {
            title: 'CHECK OUT',
            dataIndex: 'checkOutTime',
            key: 'checkout',
            render: (record) => {
                return (
                    <span>
                        {record ? moment(record).format(' hh:mm A') : '-- : --'}
                    </span>
                )
            }
        },
        {
            title: 'WORK DURATION',
            dataIndex: 'hoursWorked',
            key: 'workduration',
            render:(record)=>{
                return(
                    <span>{parseFloat(record/60).toFixed(2)} hrs</span>
                )
            }
        },
        {
            title: 'OVER TIME',
            dataIndex: '',
            key: 'overtime',
            render:(record)=>{
                return(
                    <span>{record.overTime ? parseFloat(record.overTime / 60).toFixed(2) : 0} hrs</span>
                )
            }
        },
        {
            title: 'LATE BY',
            dataIndex: 'lateArrival',
            key: 'lateby',
            render: (record) => {
                return (
                    <span> {record ? parseFloat(record/ 60).toFixed(2) : 0} hrs </span>
                )
            }

        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render:(record)=>{
                   return(
                    <strong
                        style={{
                               color: (record === "Late") ? '#E97000' : record === "Present" ? "rgba(0, 152, 201, 1)" : '#15b738'
                        }}
                    >{record}</strong>
                   )
            }
        },
        //  {
        //     title: 'ACTION',
        //     dataIndex: '',
        //     key: 'action',

        // }
    ];
    return (
        <div className='employeesAttendancePage mt-5'>
            {/* Manual Attends */}
            {/* <div className='row'> */}
                {/* <div className='col-6'>
                    <Section>
                        <div style={{
                            display: 'flex',
                            borderBottom: '1px solid #CCCCCC'

                        }}>
                            <Typography
                                variant='h5'
                                sx={{
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    textTransform: 'uppercase'
                                }}>
                                Manual Attendance
                            </Typography>
                            <Typography
                                variant='p'
                                sx={{ fontSize: '12px', lineHeight: '20px', marginLeft: 'auto' }}
                            >
                                10:29:48 am, sep 26
                            </Typography>
                        </div>
                        <div className='Text-Field mt-4 pt-4' style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                sx={{
                                    width: '100%',
                                    border: '2 px solid rgba(4, 9, 33, 0.32)',
                                    borderRadius: '8px',
                                }}
                                // value={checkIn.note}
                                // onChange={(e) => setCheckIn({ ...checkIn, note: e.target.value })}
                                // success={checkIn.note}

                                maxLength={6}
                                placeholder="Add a note"
                            />
                        </div>
                    </Section>
                </div> */}
                {/* <div className='col-6'>
                    <Present>
                        <div style={{
                            display: 'flex',
                            borderBottom: '1px solid #CCCCCC'

                        }}>
                            <Typography
                                variant='h5'
                                sx={{
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    textTransform: 'uppercase'
                                }}>
                                Present
                            </Typography>
                        </div>
                        <br /><br />
                        <div className='row'>
                            <div className='col' >
                                <img src={Presenticon} />
                            </div>
                            <div className='col'>
                                <Typography variant='h4' sx={{
                                    fontSize: '32px', lineHeight: '44px'
                                }}>40</Typography>
                                <Typography variant='p' sx={{ fontSize: '14px', lineHeight: '20px' }}>

                                    Employees
                                </Typography>
                            </div>
                        </div>
                    </Present>
                </div>
                <div className='col-6'>
                    <Present>
                        <div style={{
                            display: 'flex',
                            borderBottom: '1px solid #CCCCCC'

                        }}>
                            <Typography
                                variant='h5'
                                sx={{
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    textTransform: 'uppercase'
                                }}>
                                Absent
                            </Typography>
                        </div>
                        <br /><br />
                        <div className='row'>
                            <div className='col' >
                                <img src={Absent_icon} />
                            </div>
                            <div className='col'>
                                <Typography variant='h4' sx={{
                                    fontSize: '32px', lineHeight: '44px'
                                }}>12</Typography>
                                <Typography variant='p' sx={{ fontSize: '14px', lineHeight: '20px' }}>
                                    Employees
                                </Typography>
                            </div>
                        </div>
                    </Present>
                </div> */}
            {/* </div> */}
            {/* Attends Bar */}
            <div className='row'>
                <div className='col-12'>
                    <Attends_Header style={{ display: 'flex' }}>
                        <Typography variant="h5" sx={{ lineHeight: '40px', fontSize: '24px' }}>Attendance Logs</Typography>

                        <Typography sx={{ marginLeft: 'auto', }}>
                        </Typography>

                    </Attends_Header>
                </div>
            </div>

            {/* Attends Table View */}
            <div className='row'>
                <div className='col-12'>
                    <Attends_Table>
                        <Table
                            columns={columns}
                            dataSource={hrempAttends?.docs}
                            pagination={{
                                pageSize: 10,
                                total: hrempAttends?.total,
                                onChange: (page) => {
                                    console.log('page==>', page)
                                    getEmpAttendance(page)
                                }
                            }}
                        >
                        </Table>
                    </Attends_Table>
                </div>
            </div>
        </div>
    )
}

export default HrempAttends