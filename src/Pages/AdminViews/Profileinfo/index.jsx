import React, { useEffect, useState } from 'react'
import {
  Paper,
  Typography
} from "@mui/material";
import { SaveOutlined, DeleteOutlined } from '@ant-design/icons';
import { apiServices } from '../../../Services/apiServices';
import Profile from '../../../Assets/images/image_overview.png'
import uploadLogo from'../../../Assets/images/uploadImage.svg'
import './styles.css'
import { Button, message } from 'antd';
import { apiUploadToS3 } from '../../../Services/uploadImage';

const Profileinfo = () => {

  let AuthObj = JSON.parse(localStorage.getItem('AuthObj'));
  let userID = AuthObj?.userId;

  const [admin, setadmin] = useState({})
  const [unsavedNewImage, setunsavedNewImage] = useState(false)
  const [localData, setLocalData] = useState(JSON.parse(localStorage.getItem("AuthObj")))

  const dataset = [{ key: "Name", value: admin.name ? admin.name : "Admin" }, { key: "Contact Number", value: admin.contactNo ? admin.contactNo : "" }, { key: 'Mailing ID', value: admin.email ? admin.email : "" }]
  const emp_details = [{ key: "Team", value: "Administration" }, { key: "Role", value: "Admin" }, { key: "Status", value: "Permanent" }]

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

  useEffect(() => {
    getAdminProfile()
  }, [])
  

  const getAdminProfile = ()=>{
    apiServices("GET", `user/getuserinfo?_id=${userID}`).then(res => {
      console.log("RESPOENSE===>", res.data.User);
      setadmin(res.data.User)
    })
  }

  const onImageChange = ()=>{
    let imagedata = document.getElementById('profile-admin-upload').files[0];
    apiUploadToS3(imagedata).then((res) => {
      // console.log("image url===>", res?.data?.result);
      setunsavedNewImage(true)
      setadmin({
        ...admin,
           imageUrl: res?.data?.result
       })
    })
  }

  const onSaveAdminImage = () =>{
    apiServices("PUT", "admin/updateadmin", 
      { 
        _id: admin._id,
        imageUrl: admin.imageUrl,
        contactNo: admin.contactNo,
      }
    ).then((res) => {
      let newLocal = {
        ...localData,
        img: admin.imageUrl
      }
      setLocalData(newLocal)
      localStorage.clear()
      localStorage.setItem("AuthObj", JSON.stringify(newLocal));
      setunsavedNewImage(false)    
      message.success("Profile Image Updated!")
    }).catch((err)=>{
      message.error("Profile Update Error!")
    })
  }

  return (
    <div className="container-fluid">
      <div className="row " style={{ marginTop: "88px" }}>
        <div className="col-6" style={{ display: 'flex', flexDirection: 'row', margin: '10px 0px 10px 0px' }}>
          {/* <Typography variant='h1' sx={{ fontSize: '24px', lineHeight: '34px' }}> Name</Typography>
          <Typography variant="h1" sx={{ fontSize: '16px', lineHeight: '21px', margin: '10px 0px 0px 5px' }} >(Role)</Typography> */}
          {/* <p style={{font}} >{state[0]?.employeeName}<span>{state[0]?.roleID.roleName}</span></p> */}
        </div>
        <div className="col-6 p-2 d-flex">

        </div>
      </div>
      {/* 2nd row    */}
      <div className="row mt-2">
        <div className="col-12 col-lg-6 col-md-6">
          <Paper elevation={0} sx={{
            padding: "30px 0px 30px 30px",
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
            borderRadius: '10px',


          }}>
            <Typography variant="h6"
              sx={{
                mb: '20px',
                textTransform: "uppercase",
                fontSize: '14px',
                fontWeight: 700
              }}>
              Profile Image
            </Typography>

            <img 
              src={admin.imageUrl === "" ? Profile : admin.imageUrl} 
              style={{
                width:'200px',
                height:'200px',
                borderRadius: '10px'
              }}  
              alt="profileAdmin"
             />

            {(unsavedNewImage)
                ?
                <div className='admin-image-actions'>
                  <Button
                    danger
                    onClick={()=>{
                      setadmin({
                        ...admin,
                        imageUrl: ""
                      })
                      setunsavedNewImage(false)
                    }}
                    style={{
                      paddingBottom: '30px',
                      borderRadius: '10px'
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
                    <Button
                      style={{
                        paddingBottom: '30px',
                        borderRadius: '10px'
                      }}
                      onClick = {onSaveAdminImage}
                      type="primary"
                    >
                      <SaveOutlined />
                    </Button>
                </div>
                :
                <div className='change-image-container'>
                  <img src={uploadLogo} alt="upload"/>
                  <label>
                    <p className='change-image-text'> Change profile image</p>
                    <input type="file" id="profile-admin-upload"
                      onChange={onImageChange} accept="image/png" />
                  </label>
                </div>
            }

    
            <Typography variant="h6" 
              sx={{
                mt: '20px',
                textTransform: "uppercase",
                fontSize: '14px',
                fontWeight: 700,
                mb: '20px'
              }}
              >
              personal information
            </Typography>


            {dataset?.map((item, key) => {
              return (


                <div className="p-2 row" style={{ width: '98%', borderBottom: '0.5px solid rgba(0, 0, 0, 0.15)' }}>
                  <div className="col-12 col-md-6 col-lg-6" style={{ display: 'flex', height: '48px', alignContent: 'center' }}>
                    <p style={{ fontWeight: '700', fontSize: '14px', lineHeight: '48px', color: 'rgba(4, 9, 33, 0.6)' }}>{item.key}</p>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6" style={{ display: 'flex', height: '33px', alignContent: 'center' }}>
                    <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '33px', color: '#040921', lineHeight: '48px' }}>{item.value}</p>
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

              {emp_details.map((item, index) => {
                return (
                  <div className="p-2" style={{ width: '98%', borderBottom: '0.5px solid rgba(0, 0, 0, 0.15)' }}>
                    <div className="row">
                      <div className="col-6" style={{ display: 'flex', height: '48px', alignContent: 'center' }}>
                        <p style={{ fontWeight: '700', fontSize: '14px', lineHeight: '48px', color: 'rgba(4, 9, 33, 0.6)' }} key={index} >{item.key}</p>
                      </div>
                      <div className="col-6" style={{ display: 'flex', height: '48px', alignContent: 'center' }}>
                        <p style={{ fontWeight: '400', fontSize: '16px', lineHeight: '33px', color: '#040921', lineHeight: '48px' }}>{item.value}</p>
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

export default Profileinfo