import React, { useState, useEffect } from 'react'
import { Table } from "antd";
import { Section, Machine_Attends, Leaves, Attends_Header, Attends_Table, Button_user } from './attendsStyle'
import { Paper, Typography } from '@mui/material'
import AttendsIcon from '../../Assets/Attends_icon.png'
import moment from "moment";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//icon
import { useLocation } from 'react-router-dom';
import { apiServices } from '../../Services/apiServices';
import './attendsStyle.css'
// Table   


const Attends = () => {

    // let current = new Date(Date.now());
    let AuthObj = JSON.parse(localStorage.getItem('AuthObj'));
    let userID = AuthObj?.userId;

    const [attends, setAttends] = useState({
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
    const [checkOut, setCheckout] = useState({
        checkid: '',
        checkOutTime: "",
    })
    const [checkIn, setCheckIn] = useState({
        attendanceId: "",
        checkInTime: "",
        note: '',
    })

    // TABLE DATA
    const columns = [
        {
            title: 'DATE',
            dataIndex: 'createdAt',
            key: 'date',
            width: 110,
            render: (record) => {
                return (
                    <span>
                       {moment(record).format('DD-MM-YYYY')}
                    </span>
                )
            }
        },
        {
            title: 'NOTES',
            dataIndex: 'note',
            key: 'note',
            width: 250,
            render: (record) => {
                return (
                    <span className='noteStyle'>{record}</span>
                )
            }
        },
        {
            title: 'CHECK IN',
            dataIndex: 'checkInTime',
            key: 'checkInTime',
            width: 110,
            render: (record) => {
                return (
                    <span>
                        {(record === null)
                            ? <span> -- : -- </span>
                            : <span>{moment(record).format(' hh:mm A')}</span>
                        }
                    </span>
                )
            }

        },
        {
            title: 'CHECK OUT',
            dataIndex: 'checkOutTime',
            key: 'checkOutTime',
            width: 110,
            render: (record) => {
                return (
                    <span>
                        {(record === null)
                            ? <span> -- : -- </span>
                            : <span>{moment(record).format(' hh:mm A')}</span>
                        }

                    </span>
                )
            }
        },
        {
            title: 'WORK DURATION (hh : mm)',
            dataIndex: 'hoursWorked',
            key: 'hoursWorked',
            render: (record) => {
                return (
                    <span>
                        {record ? `${Math.floor(record / 60)} : ${Math.floor(record % 60)}` : '--:--'}
                    </span>
                )
            }
        },
        {
            title: 'OVER TIME (hh : mm)',
            dataIndex: 'overTime',
            key: 'overTime',
            render: (record) => {
                return (
                    <span>
                        {record ? `${Math.floor(record / 60)} : ${Math.floor(record % 60)}` : '--:--'}
                    </span>
                )
            }
        },
        {
            title: 'LATE BY (hh : mm)',
            dataIndex: 'lateArrival',
            key: 'lateArrival',
            render: (record) => {
                return (
                    <span>
                        {record ? `${Math.floor(record / 60)} : ${Math.floor(record % 60)}` : '--:--'}
                    </span>
                )
            }
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            fixed: 'right',
            width: 100,
            render: (record) => {
                return (
                    <>
                        {(record === "Present")
                            && <span style={{ color: '#0098C9', textTransform: 'uppercase', fontWeight: '700'}}> {record} </span>
                        }
                        {(record === "Late")
                            && <span style={{ color: '#ff7961', textTransform: 'uppercase', fontWeight: '700' }}> {record} </span>
                        }
                        {(record === "Absent")
                            && <span style={{ color: '#AC2A0D', textTransform: 'uppercase', fontWeight: '700' }}> {record} </span>
                        }
                        {(record === "On-Leave")
                            && <span style={{ color: '#E97000', textTransform: 'uppercase', fontWeight: '700' }}> {record} </span>
                        }
                    </>
                )
            }
        }
    ];

    const [attendanceLogs, setattendanceLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const [disabledNotes, setdisabledNotes] = useState(false)

    useEffect(() => {
        getRequest()
        // getAttendance()
        getAttendenceTable(page)
    }, [])

    const getAttendenceTable = async (page) => {
        let current = new Date(Date.now());
        setLoading(true)
        apiServices("GET", `attendance/?page=${page}&_id=${userID}`).then(res => {
            if (res.data.success === true) {
                setattendanceLogs(res?.data?.Attendance?.docs);
                setTotalPages(res?.data?.Attendance?.total)
                setPage(res?.data?.Attendance?.pages)
                setLoading(false)
                if (moment(current).isSame(res?.data?.Attendance?.docs[0]?.createdAt.split("T")[0], 'date')){
                    setCheckIn({
                        ...checkIn,
                        checkInTime: res?.data?.Attendance?.docs[0]?.checkInTime,
                        attendanceId: res?.data?.Attendance?.docs[0]?._id
                    })
                    setCheckout({
                        ...checkOut,
                        checkOutTime: res?.data?.Attendance?.docs[0]?.checkOutTime
                    })
                    if (res?.data?.Attendance?.docs[0]?.checkInTime || res?.data?.Attendance?.docs[0]?.checkOutTime || res?.data?.Attendance?.docs[0]?.status === "On-Leave"){
                        setdisabledNotes(true)
                    }
                }  
            }
        })
            .catch((error) => {
                console.log("error getting attendance", error);
            })
    }

    const getRequest = () => {
        apiServices("GET", `attendance/graphattendance/?_id=${userID}`).then(res => {
            setAttends({ ...res?.data })
        })
    }
    

    const check_In = (values) => {
        let current = new Date(Date.now());
        try {
            let data = {
                userId: values?.userId,
                checkInTime: current,
                note: values?.note,
            }
            apiServices("POST", "attendance/", data).then(res => {
                if (res.data.success === true) {
                    setattendanceLogs([
                        {
                            ...res?.data?.Attendance
                        },
                        ...attendanceLogs
                    ])
                    setCheckIn({
                        ...checkIn,
                        checkInTime: res?.data?.Attendance?.checkInTime,
                        attendanceId: res?.data?.Attendance?._id
                    })
                    setAttends({
                        ...attends,
                        userAttendance:{
                            checkIn: res?.data?.Attendance?.checkInTime,
                            checkOut: '',
                        }
                    })
                    setdisabledNotes(true)
                }
            })

        }
        catch (error) {
            alert("Error", error)
        }
    }
    
    const check_Out = (values) => {
        let current = new Date(Date.now());
        try {
            apiServices("PUT", `attendance/`, {
                _id: checkIn?.attendanceId,
                checkOutTime: current,
            }).then(res => {
                const newState = attendanceLogs.map(obj => {
                    if (obj._id === res?.data?.Attendance?._id) {
                        return { ...obj, checkOutTime: current, 
                                        hoursWorked: res?.data?.Attendance?.hoursWorked,
                                        note: res?.data?.Attendance?.note,
                                        overTime: res?.data?.Attendance?.overTime
                        };
                    }
                    return obj;
                });
                setattendanceLogs(newState)
                setCheckout({
                    ...checkOut,
                    checkOutTime: current
                })
                setAttends({
                    ...attends,
                    userAttendance: {
                        checkIn: res?.data?.Attendance?.checkInTime,
                        checkOut: current,
                    }
                })
                setdisabledNotes(true)
            }
            )
        }
        catch (error) {
            console.log("error", error)
        }
    }


    return (
        <>
            {/* Manual Attends */}
            <div className='Attends_top'>
                <div className='col-6 btn_check_in_out'>
                    <Section style={{height: "200px", padding: '20px'}}>
                        <div style={{
                            display: 'flex',
                            borderBottom: '1px solid #CCCCCC',
                            paddingBottom: '15px'

                        }}>
                            <Typography
                                variant='h5'
                                sx={{
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    textTransform: 'uppercase',
                                    color: '#5F5F5F'
                                }}>
                                Manual Attendance

                            </Typography>

                            <Typography
                                variant='p'
                                sx={{ fontSize: '12px', lineHeight: '20px', marginLeft: 'auto', color: '#5F5F5F' }}


                            >
                                {moment(new Date()).format("DD/MM/YYYY")}
                            </Typography>
                        </div>
                        <div className='Text-Field mt-3' style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField
                                sx={{
                                    width: '100%',
                                    border: '1px solid rgba(4, 9, 33, 0.32)',
                                    borderRadius: '8px',
                                }}
                                value={checkIn.note}
                                onChange={(e) => setCheckIn({ ...checkIn, note: e.target.value })}
                                success={checkIn.note}
                                disabled={disabledNotes}
                                inputProps={{ maxLength: 25 }}
                                placeholder="Add a note"
                            />
                        </div>
                        <Button_user>
                            {(checkIn.checkInTime && (checkOut.checkOutTime === "" || checkOut.checkOutTime === undefined || checkOut.checkOutTime === null) )
                                ?
                                <Button className="check_out" sx={{ background: '#E97000', color: '#ffffff', width: '100px', borderRadius: '100px', lineHeight: '20px', height: '40px', marginTop: '-5px' }}
                                    // disabled={checkIn.checkInTime !== "" ? false : true}
                                    onClick={() => check_Out(checkOut)}>Check out</Button>
                                :
                                (checkIn.checkInTime === "" || checkIn.checkInTime === undefined)
                                ?
                                    <Button className="check_in" sx={{ background: '#00CE15', color: '#ffffff', width: '100px', borderRadius: '100px', lineHeight: '20px', height: '40px', marginTop: '-5px' }}
                                        // disabled={checkIn.checkInTime !== ""}  
                                        onClick={() => check_In(checkIn)}
                                    >Check in</Button>
                                :
                                <p className='marked_attendace'>Attendance Marked</p>
                            }
                        </Button_user>
                    </Section>
                </div>
                {/* Machine Attends */}
                <div className='col-3'>
                    <Section style={{height: "215px", padding: '20px'}}>
                        <Typography
                            variant='h5'
                            sx={{
                                fontSize: '14px',
                                lineHeight: '20px',
                                textTransform: 'uppercase',
                                color: '#5F5F5F'
                            }}
                        >
                            Today's Attendance
                        </Typography>

                        {/* <Typography
                            variant='p'
                            sx={{
                                lineHeight: '16px',
                                fontSize: '12px',
                                color: 'rgba(4, 9, 33, 0.6)'

                            }}>TODAY</Typography> */}
                        <Paper elevation={0}
                            sx={{

                                padding: '15px 15px 15px 15px',
                                borderRadius: "10px",
                                mt: '30px',
                                background: 'rgba(0, 152, 201,0.1)',
                                height:'115px',
                                display: 'flex'
                            }}
                        >
                            <div className='row' style={{margin: 'auto'}}>
                                <div className='col' style={{ borderRight: " 0.5px solid rgba(0, 0, 0, 0.2)" }}>
                                    <Typography variant='p' style={{ width: '56px', fontWeight: '400', color: 'rgba(0, 0, 0, 0.5)' }} >CHECK IN</Typography>
                                    <Typography variant='h4' sx={{ fontSize: '16px', lineHeight: '27px' }}>{(attends?.userAttendance?.checkIn !== "Invalid date" && attends?.userAttendance?.checkIn !== "") ? moment(attends?.userAttendance?.checkIn).format(' hh:mm A') : "--:--"}</Typography>
                                </div>
                                <div className='col'>
                                    <Typography variant='p' style={{color: 'rgba(0, 0, 0, 0.5)'}}>CHECK OUT</Typography>
                                    <Typography variant='h4' sx={{ fontSize: '16px', lineHeight: '27px' }}>{(attends?.userAttendance?.checkOut !== "Invalid date" && attends?.userAttendance?.checkOut !== "") ? moment(attends?.userAttendance?.checkOut).format(' hh:mm A') : "--:--"}</Typography>
                                </div>
                            </div>
                        </Paper>
                    </Section>
                </div>
                {/* Leaves */}
                <div className='col-3'>
                    <Section style={{height: "200px", padding: '20px'}}>
                    <div style={{
                            display: 'flex',
                            borderBottom: '1px solid #CCCCCC',
                            paddingBottom: '15px'

                        }}>
                            <Typography
                                variant='h5'
                                sx={{
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    textTransform: 'uppercase',
                                    color: '#5F5F5F'
                                }}>
                                    leaves

                            </Typography>

                        </div>

                        <div className='row' style={{
                            marginTop: '50px',
                            // gap: '25px'
                        }}>
                            <div className='col-lg-6 col-md-2 col-sm-2' style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                                <Typography variant='h4' sx={{
                                    fontSize: '32px', lineHeight: '44px'
                                }}>
                                    {attends?.Month?.remainingLeaves !== "NaN" ? attends?.Month?.remainingLeaves : "0"}
                                </Typography>
                                <Typography variant='p' sx={{ fontSize: '14px', lineHeight: '20px', width: '113%', color: 'rgba(0, 0, 0, 0.5)' }}>

                                    Remaining Leaves
                                </Typography>
                            </div>
                            <div className='col-lg-6 col-md-10 col-sm-10'  style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
                                <img src={AttendsIcon} style={{marginLeft: 'auto', height: '80%'}} />
                            </div>

                        </div>
                    </Section>
                </div>
            </div>
                 <Typography className='mb-2 mt-5' variant="h5" sx={{ lineHeight: '40px', fontSize: '24px', margin: '12px' }}>Attendance Logs</Typography>
            <div className='row' style={{margin: '12px 12px 30px 12px'}}>
                <Section style={{marginTop: '10px'}} className="paginationStyle">
                 {/* <Typography className='mb-3' variant="h5" sx={{ lineHeight: '40px', fontSize: '24px', margin: '12px' }}>Attendance Logs</Typography> */}
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={attendanceLogs}
                        pagination={{
                            pageSize: 10,
                            total: totalPages,
                            onChange: (page) => {
                                getAttendenceTable(page)
                            }
                        }}
                        // scroll={{
                        //     x: 1500,
                        //     y: 300,
                        // }}
                    />
                </Section>
            </div>
        </>
    )

}

export default Attends