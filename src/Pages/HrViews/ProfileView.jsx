import React from "react";
import {
  Button,
  Paper,
  Typography

} from "@mui/material";
import moment from "moment";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { apiServices } from "../../Services/apiServices";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProfileView = () => {

  const { state } = useLocation();
  const navigate = useNavigate();


  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState({})
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 598,
    height: 473,
    bgcolor: 'background.paper',
    border: '2px solid',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  const EditEmploy = (type, data) => {
    if (type === "edit") {
      navigate("/AddEmploy", { state: data[0] })
    }
  }
  const Delete = async (userId) => {
    apiServices('DELETE', 'user/deleteuser', userId).then((res) => {
      if (res.data.success === true) {
        navigate("/management");

      }

    }
    )
  }

  const data = [{ key: "Name", value: state[0].employeeName }, { key: "Contact Number", value: state[0].contactNo }, { key: "CNIC Number", value: state[0].cnicNumber }, { key: "Account Number", value: state[0]?.accountNo }, { key: 'Emergency Contact Number', value: state[0]?.emergencyContactNo }, { key: 'Devgate Mailing ID', value: state[0].devgateMailingId }]
  //const dataset=[{key:'Team',value:state?.teamID.teamName},{key:'Role',value:state?.roleID.roleName},{key:'Type',value:state?.roleID.roleName},{key:'Level',value:state?.roleID.level},{key:'Status',value: state?.employeeStatusID.employeeStatusName},{key:'Salary',value:state?.salary},{key:'Joining Date',value:state?.employmentStartingDate},{key:'Ending Date',value:state?.employmentEndingDate}]
  const dataset = [{ key: "Team", value: state[0].teamID.teamName }, { key: "Role", value: state[0].roleID.roleName }, { key: 'Type', value: state[0].employeeTypeID.employeeTypeName }, { key: "Level", value: state[0]?.roleID.level }, { key: 'Status', value: state[0]?.employeeStatusID.employeeStatusName }, { key: 'Salary', value: state[0]?.salary }, { key: 'Joining Date', value: moment(state[0]?.employmentStartingDate).format('YYYY-MM-DD') }, { key: 'Ending Date', value: moment(state[0]?.employmentEndingDate).format('YYYY-MM-DD') }]

  return (
    <div className="container-fluid">
      <div className="row " style={{ marginTop: "70px" }}>
        <div className="col-6 p-2" style={{ display: 'flex', flexDirection: 'row' }}>
          <Typography variant='h5' sx={{ fontSize: '24px', marginRight: '20px', width: '22px', height: '18px', color: '#0098C9' }}><ArrowBackIcon onClick={() => { navigate('/management') }} /></Typography>
          <Typography variant='h1' sx={{ fontSize: '24px', lineHeight: '34px' }}>{state[0]?.employeeName}          <Typography variant="h1" sx={{ fontSize: '16px', lineHeight: '21px' }} >({state[0]?.roleID.roleName})</Typography>
          </Typography>
          {/* <p style={{font}} >{state[0]?.employeeName}<span>{state[0]?.roleID.roleName}</span></p> */}
        </div>
        <div className="col-6 p-2 d-flex">
          <Button
            variant="contained"
            onClick={() => EditEmploy("edit", state)}

            sx={{
              background: "#0098C933",
              color: "#0098C9",
              borderRadius: "100px",
              padding: "10px 24px 10px 24px",
              border: "none",
              boxShadow: "none",
              marginLeft: "auto",
              "&:hover": {
                color: "#fff",
              },
            }}
          >
            Edit Details
          </Button>
          <Button
            variant="contained"
            onClick={() => handleOpen()}
            sx={{
              background: "#FF5630",
              color: "#fff",
              borderRadius: "100px",
              padding: "10px 24px 10px 24px",
              border: "none",
              boxShadow: "none",
              marginLeft: "10px",
              "&:hover": {
                color: "#fff",
                background: "#FF5645",
              },
            }}
          >
            Disable
          </Button>
        </div>
      </div>
      {/* 2nd row    */}
      <div className="row">
        <div className="col">
          <Paper elevation={0} sx={{
            padding: "30px 0px 30px 31px",
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
            borderRadius: '10px',


          }}>
            <Typography variant="h6"
              sx={{
                mb: '40px',
                textTransform: "uppercase",
                fontSize: '14px',
                fontWeight: 700
              }}>
              Profile Image
            </Typography>

            <img src={state[0]?.imageUrl} alt="profile" width={'224px'} height='239px' />
            <Typography variant="h6" sx={{
              mt: '56px',
              textTransform: "uppercase",
              fontSize: '14px',
              fontWeight: 700,
              mb: '40px'

            }}>
              personal information
            </Typography>


            {data?.map((item, index) => {
              return (


                <div className="p-2 row" style={{ width: '98%', borderBottom: '0.5px solid rgba(0, 0, 0, 0.15)' }}>
                  <div className="col-6" style={{ display: 'flex', height: '48px', alignContent: 'center' }}>
                    <p style={{ fontWeight: '700', fontSize: '20px', lineHeight: '48px', color: 'rgba(4, 9, 33, 0.6)' }}>{item.key}</p>
                  </div>
                  <div className="col-6" style={{ display: 'flex', height: '48px', alignContent: 'center' }}>
                    <p style={{ fontWeight: '400', fontSize: '24px', lineHeight: '33px', color: '#040921', lineHeight: '48px' }}>{item.value}</p>
                  </div>

                </div>
              )
            }
            )}



          </Paper>
        </div>
        <div className="col-6" >
          <Paper elevation={0} sx={{
            padding: "30px 0px 30px 31px",
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
            borderRadius: '10px',
            height: '100%'
          }}>

            <Typography variant="h6" sx={{
              mb: '40px',
              textTransform: "uppercase",
              fontSize: '14px',
              fontWeight: 700,


            }}>
              EMPLOYMENT DETAILS
            </Typography>

            <div className="row border-bottom-0" >

              {dataset.map((item, index) => {
                return (
                  <div className="p-2" style={{ width: '98%', borderBottom: '0.5px solid rgba(0, 0, 0, 0.15)' }}>
                    <div className="row">
                      <div className="col-6" style={{ display: 'flex', height: '48px', alignContent: 'center' }}>
                        <p style={{ fontWeight: '700', fontSize: '20px', lineHeight: '48px', color: 'rgba(4, 9, 33, 0.6)' }} key={index} >{item.key}</p>
                      </div>
                      <div className="col-6" style={{ display: 'flex', height: '48px', alignContent: 'center' }}>
                        <p style={{ fontWeight: '400', fontSize: '24px', lineHeight: '33px', color: '#040921', lineHeight: '48px' }}>{item.value}</p>
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
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="BoxModal">
            <div className="row">
              <div className="offset-10 col-2" style={{ height: '30px' }}>
                <Button sx={{ float: 'right', width: '14px', height: '14px', background: 'none', color: 'rgba(31, 31, 31, 0.7)' }} onClick={handleClose}><CloseOutlinedIcon /></Button>
              </div>
            </div>
            <div className="row">
              <div className="col-12"
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', padding: '0px 116px' }}>
                <span><CancelOutlinedIcon sx={{ fontSize: "83px ", fontWeight: 500, color: '#FF5630' }} /></span>
                <Typography variant='h5' sx={{ fontSize: '24px', lineHeight: '40px', margin: '20px 0px 10px 0px' }}>Are you sure?</Typography>
                <Typography variant='p' sx={{ fontSize: '16px', lineHeight: '24px', textAlign: 'center' }}>By Deactivating Employe  "{state[0]?.employeeName}"that you wont be able to see the user data anymore.</Typography>


              </div>
            </div>
            <div className="row" style={{ margin: '54px 0px 0px 0px' }}>
              <div className="col-12">
                <div className="fotter" style={{ float: 'right', marginTop: '60px', borderRadius: '20px' }}>
                  <Button variant="outlined" sx={{ margin: '10px', borderRadius: '20px', color: '#1C1E23', letterSpacing: '0.1' }} onClick={handleClose}>Discard</Button>
                  <Button variant="contained" sx={{ borderRadius: '20px', background: '#FF5630', letterSpacing: '0.1' }} onClick={() => Delete(state[0]?._id)}>Deactivate</Button>

                </div>
              </div>

            </div>
          </div>

        </Box>
      </Modal>







    </div>
  );
};

export default ProfileView;
