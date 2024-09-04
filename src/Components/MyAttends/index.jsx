import React from 'react'
import { Section, Machine_Attends, Leaves, Attends_Header, Attends_Table, Button_user } from './attendsStyle'
import { Paper, Typography } from '@mui/material'
import AttendsIcon from '../../Assets/Attends_icon.png'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MenuFoldOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import moment from "moment";


const Markattendance = ({ note, setNote, markAttendance,empmarkAttendance,loading,totalPages,attends,getviewAttendance }) => {
    
    
    const columns = [
        {
            title: 'DATE',
            dataIndex: 'checkInTime',
            key: 'date',
              render: (record) => {
                return (
                  <div>
                    <p>{moment(record).format('DD-MM-YYYY')}</p>
                  </div>
                )
              }
        },
        {
            title: 'CHECK IN',
            dataIndex: 'checkInTime',
            key: 'checkInTime',
        },
        {
            title: 'CHECK OUT',
            dataIndex: 'checkOutTime',
            key: 'checkOutTime',
        },
        {
            title: 'WORK DURATION',
            dataIndex: 'hoursWorked',
            key: 'hoursWorked',
        },
        {
            title: 'OVER TIME',
            dataIndex: 'overTime',
            key: 'overTime',
        },
        {
            title: 'LATE BY',
            dataIndex: 'lateArrival',
            key: 'lateArrival',
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',


        }
    ];

    return (
        <>

            {/* Manual Attends */}
            <div className='row'>
                <div className='col-6'>
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
                        <div className='Text-Field mt-4' style={{ display: 'flex', flexDirection: 'column' }}>
                            <TextField

                                sx={{
                                    width: '100%',
                                    border: '2 px solid rgba(4, 9, 33, 0.32)',
                                    borderRadius: '8px',
                                }}
                                required
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder={`Add a note`}
                            />
                        </div>
                        <Button_user>
                            <Button sx={{ background: '#9C6B10', color: '#ffffff', width: '100px', borderRadius: '100px', lineHeight: '20px', height: '40px', marginRight: '14px' }}
                                onClick={() => empmarkAttendance("checkout")}
                            >Check out</Button>
                            {/* //apiData */}
                            <Button sx={{ background: '#38CB89', color: '#ffffff', width: '100px', borderRadius: '100px', lineHeight: '20px', height: '40px' }}
                                onClick={() => empmarkAttendance("checkin")}
                            >Check in</Button>
                        </Button_user>
                    </Section>
                </div>
                {/* Machine Attends */}
                <div className='col-3'>
                    <Machine_Attends>
                        <Typography
                            variant='h5'

                        >
                            Machine Attendance
                        </Typography>

                        <Typography
                            variant='p'
                            sx={{
                                lineHeight: '16px',
                                fontSize: '12px'

                            }}>TODAY</Typography>
                        <Paper elevation={0}
                            sx={{

                                padding: '15px 15px 15px 15px',
                                borderRadius: "10px",
                                mt: '10px',
                                background: 'rgba(0, 152, 201,0.1)',
                                // height:'117px'
                            }}
                        >
                            <div className='row'>
                                <div className='col' style={{ borderRight: " 0.5px solid rgba(0, 0, 0, 0.2)" }}>
                                    <Typography variant='p' >CHECK IN</Typography>
                                    <Typography variant='h4' sx={{ fontSize: '20px', lineHeight: '27px' }}>10:39<Typography variant='span'>AM</Typography></Typography>
                                </div>
                                <div className='col'>
                                    <Typography variant='p'>CHECK OUT</Typography>
                                    <Typography>--:-- <Typography variant='span'>PM</Typography></Typography>
                                </div>
                            </div>
                        </Paper>
                    </Machine_Attends>
                </div>

                {/* Leaves */}
                <div className='col-3'>
                    <Leaves>
                        <div style={{ display: 'flex', borderBottom: '1px solid #CCCCCC' }}>

                            <Typography variant='h5'
                                sx={{
                                    fontSize: '14px',
                                    textTransform: 'uppercase',
                                    lineHeight: '20px'
                                }}

                            >leaves

                            </Typography>

                        </div>
                        <br /><br />
                        <div className='row'>
                            <div className='col'>
                                <Typography variant='h4' sx={{
                                    fontSize: '32px', lineHeight: '44px'
                                }}>13</Typography>
                                <Typography variant='p' sx={{ fontSize: '14px', lineHeight: '20px' }}>

                                    Remaining Leaves
                                </Typography>
                            </div>
                            <div className='col' >
                                <img src={AttendsIcon} />
                            </div>

                        </div>

                    </Leaves>
                </div>


            </div>
            {/* Attends  Bar*/}

            <div className='row'>
                <div className='col-12'>
                    <Attends_Header style={{ display: 'flex' }}>
                        <Typography variant="h5" sx={{ lineHeight: '40px', fontSize: '24px' }}>Attendance Logs</Typography>

                        <Typography sx={{ marginLeft: 'auto', }}> <MenuFoldOutlined style={{ width: '20px', height: '18px', fontSize: '24px' }} />
                        </Typography>
                    </Attends_Header>
                </div>
            </div>
            {/* Attends Table */}
            <div className='row'>
                <div className='col-12'>
                    <Attends_Table>
                        <Table
                                loading={loading}

                            columns={columns}
                            dataSource={attends}
                            pagination={{
                                pageSize:10,
                                total:totalPages,
                                onChange:(page)=>{
                                    getviewAttendance(page)
                                }
                      
                              }}
                        >

                        </Table>
                    </Attends_Table>
                </div>
            </div>



        </>
    )
}

export default Markattendance