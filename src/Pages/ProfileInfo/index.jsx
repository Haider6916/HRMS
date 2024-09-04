import React, { useEffect } from 'react';
import './style.css';
import {
  Paper,
  Typography

} from "@mui/material";
import { useState } from 'react';
import { apiServices } from '../../Services/apiServices';
import moment from "moment";

const ProfileInfo = () => {
  const [profileinfo, setprofileInfo] = useState({
    User: {
      employeeName: '',
      contactNo: '',
      cnicNumber: '',
      accountNo: '',
      emergencyContactNo: '',
      email: '',
      team: '',
      role: '',
      level: '',
      employeeType: '',
      employeeStatus: '',
      imageUrl: '',
    }
  })

  const join_date = moment(profileinfo?.User?.employmentStartingDate).format('DD-MM-YYYY');
  const end_date = moment(profileinfo?.User?.employmentEndingDate).format('DD-MM-YYYY');

  const personalInfo = [{ key: "Name", value: profileinfo?.User?.employeeName }, { key: "Contact Number", value: profileinfo?.User?.contactNo }, { key: 'Mailing ID', value: profileinfo?.User?.email }, { key: "Employee ID", value: profileinfo?.User?.cnicNumber }]
  const employDetails = [{ key: "Team", value: profileinfo?.User?.team }, { key: "Role", value: profileinfo?.User?.role }, { key: 'Type', value: profileinfo?.User?.employeeType }, { key: 'Status', value: profileinfo?.User?.employeeStatus }, { key: 'Salary', value: profileinfo?.User?.salary }, { key: 'Joining Date', value: join_date }, { key: 'Ending Date', value: (profileinfo?.User?.employmentEndingDate === '' ? profileinfo?.User?.employmentEndingDate : end_date) }]

  // { key: "Level", value: profileinfo?.User?.level },

  let AuthObj = JSON.parse(localStorage.getItem('AuthObj'));
  let userID = AuthObj?.userId;

  useEffect(() => {
    apiServices("GET", `user/getuserinfo/?_id=${userID}`).then(res => {
      setprofileInfo({ ...res?.data })
    })
  }, [])


  return (
    <div className="container-fluid">
      <div className="row " style={{ marginTop: "70px" }}>
        <div className="col-12 col-md-12 col-lg-12 p-2" style={{ display: 'flex', flexDirection: 'row', margin: '10px 0px 10px 10px' }}>
          {/* <Typography variant='h5' sx={{ fontSize: '24px', marginRight: '20px', width: '22px', height: '18px', color: '#0098C9' }}><ArrowBackIcon></ArrowBackIcon></Typography> */}
          <Typography variant='h1' sx={{ fontSize: '24px', lineHeight: '34px' }}> {profileinfo?.User?.employeeName}</Typography>
          <Typography variant="h1" sx={{ fontSize: '16px', lineHeight: '21px', margin: '10px 0px 0px 5px' }}>({profileinfo?.User?.role})</Typography>
          {/* <p style={{font}} >{state[0]?.employeeName}<span>{state[0]?.roleID.roleName}</span></p> */}
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-12 col-lg-6 u_image">
          <Paper elevation={0} sx={{
            padding: "30px 0px 30px 31px",
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
            borderRadius: '10px',
          }}>
            <Typography variant="h6"
              sx={{
                mb: '25px',
                textTransform: "uppercase",
                fontSize: '14px',
                fontWeight: 700
              }}>
              Profile Image
            </Typography>
            <img className='img' src={profileinfo?.User?.imageUrl} alt="profile" />
            <Typography variant="h6" sx={{
              mt: '36px',
              textTransform: "uppercase",
              fontSize: '14px',
              fontWeight: 700,
              mb: '15px'

            }}>
              personal information
            </Typography>
            {personalInfo?.map((item, key) => {
              return (
                <div className="p-2 row" style={{ width: '100%', borderBottom: '0.5px solid rgba(0, 0, 0, 0.15)' }}>
                  <div className="col-12 col-md-6 col-lg-6" style={{ display: 'flex', height: '35px', alignContent: 'center' }}>
                    <Typography sx={{ fontWeight: '700', fontSize: '15px', lineHeight: '35px', color: 'rgba(4, 9, 33, 0.6)' }}>{item.key}</Typography>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6" style={{ display: 'flex', lineHeight: '38px', alignContent: 'center' }}>
                    <Typography sx={{ fontWeight: '400', fontSize: '17px', lineHeight: '35px', color: '#040921', wordBreak: 'break-all'  }}>{item.value}</Typography>
                  </div>
                </div>
              )
            }
            )}
          </Paper>
        </div>
        <div className="col-12 col-md-12 col-lg-6" >
          <Paper elevation={0} sx={{
            padding: "30px 0px 30px 31px",
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
            borderRadius: '10px',
            height: '100%'
          }}>

            <Typography variant="h6" sx={{
              mb: '15px',
              textTransform: "uppercase",
              fontSize: '14px',
              fontWeight: 700,


            }}>
              EMPLOYMENT DETAILS
            </Typography>
            <div className="row border-bottom-0" >
              {employDetails.map((item, index) => {
                return (
                  <div className="p-2" style={{ width: '96%', borderBottom: '0.5px solid rgba(0, 0, 0, 0.15)' }}>
                    <div className="row">
                      <div className="col-12 col-md-6 col-lg-6" style={{ display: 'flex', height: '35px', alignContent: 'center' }}>
                        <p style={{ fontWeight: '700', fontSize: '15px', lineHeight: '35px', color: 'rgba(4, 9, 33, 0.6)' }} key={index} >{item.key}</p>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6" style={{ display: 'flex', height: '38px', alignContent: 'center' }}>
                        <p style={{ fontWeight: '400', fontSize: '17px', lineHeight: '35px', color: '#040921' }}>{item.value}</p>
                      </div>
                    </div>
                  </div>
                )
              }
              )}
            </div>
          </Paper>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo