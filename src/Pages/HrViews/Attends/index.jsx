import React from 'react'
import { Attends_Header, Attends_Table, Present, Section } from './AttendanceStyle'
import { Typography, Select, InputLabel } from '@mui/material'
import Presenticon from '../../../Assets/Icons/Presenticon.png'
import Absent_icon from '../../../Assets/Icons/Absent_icon.png'
import UserAttends from '../../../Components/UserAttends'

const HrAttends = () => {
    return (
        <div className='mt-5'>
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

                            <InputLabel id="demo-simple-select-label">
                                Select employe
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            // value={age}

                            // onChange={handleChange}
                            >
                                <option>Helo</option>
                            </Select>
                        </div>
                    </Section>


                </div>
                <div className='col-3'>
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

                            <Typography
                                variant='p'
                                sx={{ fontSize: '12px', lineHeight: '20px', marginLeft: 'auto' }}


                            >
                                see all
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
                <div className='col-3'>
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

                            <Typography
                                variant='p'
                                sx={{ fontSize: '12px', lineHeight: '20px', marginLeft: 'auto' }}


                            >
                                see all
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
                </div>

            </div>
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

                        <UserAttends />




                    </Attends_Table>
                </div>
            </div>
        </div>
    )
}
export default HrAttends