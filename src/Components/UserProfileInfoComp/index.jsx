import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Typography, Paper, Button } from "@mui/material";
import {ReactComponent as ArrowIcon} from '../../Assets/Icons/back_arrow.svg'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

import moment from "moment";
import './style.css'



const UserProfileInfoComp = ({ empData, backHandle, enableUser, deleteUser }) => {

  const [modal, setModal] = useState({
    disable: false,
    enable: false
  });
  const [userId, setUserId] = React.useState({})


  
  const navigate = useNavigate();

  const handleOpen = (type) => {
    if(type === 'disable'){
      setModal({disable: true})
    }else if(type === 'enable'){
      setModal({enable: true})
    }
  };
  const handleClose = (type) => {
    if(type === 'disable'){
      setModal({disable: false})
    }else if(type === 'enable'){
      setModal({enable: false})
    }
  };

  const AddEmploy = (data) => {
      navigate("/AddEmploy", { state: data });
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 598,
    height: 473,
    bgcolor: 'background.paper',
    // border: '2px solid',
    borderRadius: 2,
    boxShadow: 24,
    paddingTop: 5
  };




const join_date = moment(empData?.employmentStartingDate).format('DD-MM-YYYY');
const end_date = moment(empData?.employmentEndingDate).format('DD-MM-YYYY');

const personalInfo = [{ key: "Name", value: empData?.employeeName }, { key: "Contact Number", value: empData?.contactNo }, { key: 'Mailing ID', value: empData?.email }, { key: "Employee ID", value: empData?.cnicNumber }]
const employDetails = [{ key: "Team", value: empData?.team }, { key: "Role", value: empData?.role }, { key: 'Type', value: empData?.employeeType }, { key: 'Status', value: empData?.employeeStatus }, { key: 'Salary', value: empData?.salary }, { key: 'Joining Date', value: join_date }, { key: 'Ending Date', value: (empData?.employmentEndingDate === '' ? empData?.employmentEndingDate : end_date) }]

  return (
    <div className="container-fluid">
      <div className="row " style={{ marginTop: "70px" }}>
        <div className="col-12 col-md-12 col-lg-12 p-2 mb-3 mt-4 iconStyle d-flex" style={{ display: 'flex', flexDirection: 'row', margin: '10px 0px 10px 10px' }}>
          {/* <Typography variant='h5' sx={{ fontSize: '24px', marginRight: '20px', width: '22px', height: '18px', color: '#0098C9' }}><ArrowBackIcon></ArrowBackIcon></Typography> */}
          <ArrowIcon onClick={backHandle} />
          <Typography variant='h1' sx={{ fontSize: '24px', lineHeight: '34px' }}> {empData?.employeeName}</Typography>
          <Typography variant="h1" sx={{ fontSize: '16px', lineHeight: '21px', margin: '10px 0px 0px 5px' }}>({empData?.role})</Typography>
          
          { empData.employeeStatus === "In-Active" ?
          <Button
            LinkComponent={Link}
            onClick={(event) => { 
              event.stopPropagation();
              handleOpen('enable');
              setUserId(empData);
            }}
            id='edit_buttonStyle'
          > 
            Enable
          </Button>
          :
          <>
              <Button
                // variant="contained"
                LinkComponent={Link}
                onClick={(event) => { event.stopPropagation(); AddEmploy(empData); }}
                id='edit_buttonStyle'
              >
              Edit Details
              </Button>
              <Button
                // variant="contained"
                onClick={(event) => {
                  event.stopPropagation();
                  handleOpen('disable');
                  setUserId(empData);
                }}
                id='dis_buttonStyle'
              >
                Disable
              </Button>
            </>
            }
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
            <img className='img' src={empData?.imageUrl} alt="profile" />
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
                    <Typography sx={{ fontWeight: '400', fontSize: '17px', lineHeight: '35px', color: '#040921' , wordBreak: 'break-all'  }}>{item.value}</Typography>
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

      {/* ====Disable Model */}
      <Modal
        open={modal.disable}
        onClose={() => handleClose('disable')}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="BoxModal">
            <div className="row">
              <div className=" offset-10 col-2" style={{ height: '30px' }}>
                <Button sx={{ float: 'right', width: '100%', height: '14px', background: 'none', color: 'rgba(31, 31, 31, 0.7)' }} onClick={() => handleClose('disable')}><CloseOutlinedIcon /></Button>
              </div>
            </div>
            <div className="row">
              <div className="col-12"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', padding: '0px 116px' }}>
                <span><CancelOutlinedIcon sx={{ fontSize: "83px ", fontWeight: 500, color: '#FF5630' }} /></span>
                <Typography variant='h5' sx={{ fontSize: '24px', lineHeight: '40px', margin: '20px 0px 10px 0px' }}>Are you sure?</Typography>
                <Typography variant='p' sx={{ fontSize: '16px', lineHeight: '24px', textAlign: 'center' }}>By Deactivating Employee  "{userId.employeeName}"  that you wont be able to see the user data anymore.</Typography>
              </div>
            </div>
            <div className="row" style={{ margin: '54px 0px 0px 0px' }}>
              <div className="col-12">
                <div className="fotter" style={{ float: 'right', marginTop: '60px', borderRadius: '20px' }}>
                  <Button variant="outlined" sx={{ margin: '10px', borderRadius: '20px', color: '#1C1E23', letterSpacing: '0.1' }} onClick={() => handleClose('disable')}>Discard</Button>
                  <Button variant="contained" sx={{ borderRadius: '20px', background: '#FF5630', letterSpacing: '0.1' }} 
                  onClick={() => { 
                    deleteUser(userId); 
                    handleClose('disable');
                    backHandle();
                    }}>
                      Deactivate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      {/* ====Enable Model */}
      <Modal
        open={modal.enable}
        onClose={() => handleClose('enable')}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{height: '450px'}}>
          <div className="BoxModal">
            <div className="row">
              <div className=" offset-10 col-2" style={{ height: '30px' }}>
                <Button sx={{ float: 'right', width: '100%', height: '14px', background: 'none', color: 'rgba(31, 31, 31, 0.7)' }} onClick={() => handleClose('enable')}><CloseOutlinedIcon /></Button>
              </div>
            </div>
            <div className="row">
              <div className="col-12"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', padding: '0px 116px' }}>
                {/* <span><CancelOutlinedIcon sx={{ fontSize: "83px ", fontWeight: 500, color: '#FF5630' }} /></span> */}
                <span><CheckCircleOutlinedIcon sx={{ fontSize: "83px ", fontWeight: 500, color: '#39d139' }} /></span>
                <Typography variant='h5' sx={{ fontSize: '24px', lineHeight: '40px', margin: '20px 0px 10px 0px' }}>Are you sure?</Typography>
                <Typography variant='p' sx={{ fontSize: '16px', lineHeight: '24px', textAlign: 'center' }}>You want to Activate Employee  "{userId.employeeName}"</Typography>
              </div>
            </div>
            <div className="row" style={{ margin: '54px 0px 0px 0px' }}>
              <div className="col-12">
                <div className="fotter" style={{ float: 'right', marginTop: '60px', borderRadius: '20px' }}>
                  <Button variant="outlined" sx={{ margin: '10px', borderRadius: '20px', color: '#1C1E23', letterSpacing: '0.1' }} onClick={() => handleClose('enable')}>Discard</Button>
                  <Button className='btn btn-primary' variant="contained" sx={{ borderRadius: '20px', letterSpacing: '0.1' }} 
                  onClick={() => {
                    enableUser(userId); 
                    handleClose('enable');
                    backHandle();
                  }}
                  >
                      Activate
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>


    </div>
  )
}

export default UserProfileInfoComp;