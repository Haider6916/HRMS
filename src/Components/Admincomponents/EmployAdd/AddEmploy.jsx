import React, { useState, useEffect } from "react";

import { Button, Avatar, Form, Input, DatePicker, Select, message, InputNumber, Spin } from "antd";
import { Typography } from "@mui/material";
import { UserOutlined } from '@ant-design/icons';
import "./style.css";
// redux dispatch
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

// ApiCalls

import { apiServices } from "../../../Services/apiServices";
import { apiUploadToS3 } from "../../../Services/uploadImage";
import moment from "moment";
import { AddNewEmployee } from '../../../Redux/EmployeeRedux/employeedetailsSlice'
// Icon & Tool tip
import Tooltip from '@mui/material/Tooltip';
import ClearIcon from '@mui/icons-material/Clear';
import FormItem from "antd/es/form/FormItem";
import PhoneNoInput from "../../PhoneNoInput";

// Api Call
const { Option } = Select;

const AddEmploy = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const LocalData = JSON.parse(localStorage.getItem("AuthObj"));
  let companyID = LocalData?.companyID
  const [TeamId, setTeamid] = useState("");
  const [RoleId, setRoleId] = useState("");
  const [TypeId, setTypeId] = useState("");
  const [teamLeadId, setteamLeadId] = useState("");
  const [levelsID, setLevels] = useState("");
  const [StatusId, setStatusId] = useState("");
  const [shiftid, setShiftId] = useState("");
  const [positionId, setpositionId] = useState("")
  const [employDetails, setEmploydetails] = useState({})
  const [teamLeads, setTeamLead] = useState([])
  const [shifts, setShift] = useState({})
  

  const [formData, setformData] = useState({
    employeeName: state ? state?.employeeName : "",
    email: state ? state?.email : "",
    accountNo: state ? state?.accountNo : "",
    contactNo: state ? state?.contactNo : "",
    password: state ? "" : "",
    emergencyContactNo: state ? state?.emergencyContactNo : "",
    dateOfBirth: state ? state?.dateOfBirth : "",
    cnicNumber: state ? state?.cnicNumber : ' ',
    team: state ? state?.teamID?._id : TeamId,
    role: state ? state?.roleID?._id : RoleId,
    employeeType: state ? state?.employeeType?._id : TypeId,
    employeeStatusID: state ? state?.employeeStatusID?._id : StatusId,
    employmentStartingDate: state ? state?.employmentStartingDate : "",
    employmentEndingDate: state ? state?.employmentEndingDate : "",
    salary: state ? state?.salary : "",
    imageUrl: state ? state?.imageUrl : '',
    casualLeaves: state ? state?.sickLeaves : '',
    sickLeaves: state ? state?.sickLeaves : '',
    _id: state ? state?._id : '',
  })
  const [postformData, setPostformData] = useState({})


  const [imgLoad, setImgLoad] = useState(false);

  
  useEffect(() => {
    getEmployeeDetails()
    getTeamLeads()
    getShifts()
  }, [])

  // employee details
  const getEmployeeDetails = ()=>{
    apiServices("GET", "employeedetails").then((res) => {
      setEmploydetails(res?.data?.employementDetails[0])
    })
  }
  // Shifts
  const getShifts = ()=>{
    apiServices("GET", "shift/").then((res => {
      setShift(res?.data)
    }))
  }
  //  Team Lead Get Api Calls
  const getTeamLeads = async() =>{
    apiServices("GET", "user/viewteamleads/").then((res) => {
      setTeamLead(res?.data?.User)
    })
  } 
  const handlePositionId = (positionId) => {
    setpositionId(positionId);
    if (!state) {
      setPostformData({
        ...postformData,
        positionName: positionId
      })
    }
    else {
      setformData({
        ...formData,
        positionName: positionId
      })
    }

  }
  const handleTeamId = (teamId) => {
    setTeamid(teamId);
    if (!state) {
      setPostformData({
        ...postformData,
        team: teamId
      })
    }
    else {
      setformData({
        ...formData,
        team: teamId
      })
    }

  };
  const handleTeamLead = (teamsLeads) => {
    setteamLeadId(teamsLeads);
    if (!state) {
      setPostformData({
        ...postformData,
        teamLead: teamsLeads,
      })

    } else {
      setformData({
        ...formData,
        teamLead: teamsLeads
      })
    }

  }
  const handlevelsId = (levelId) => {
    setLevels(levelId);
    if (!state) {

      setPostformData({
        ...postformData,
        level: levelId

      })
    }
    else {
      setformData({
        ...formData,
        level: levelId,
      })
    }


  }
  const handleRoleId = (roleId) => {
    setRoleId(roleId);
    if (!state) {
      setPostformData({
        ...postformData,
        role: roleId
      })
    }
    else {
      setformData({
        ...formData,
        role: roleId
      })
    }

  };
  const handleEmployTypeid = (employTypeid) => {
    setTypeId(employTypeid);
    if (!state) {
      setPostformData({
        ...postformData,
        employeeType: employTypeid
      })
    }
    else {
      setformData({
        ...formData,
        employeeType: employTypeid
      })
    }
  };
  const handleStatusId = (statusId) => {
    setStatusId(statusId);
    if (!state) {
      setPostformData({
        ...postformData,
        employeeStatus: statusId
      })
    }
    else {
      setformData({
        ...formData,
        employeeStatus: statusId

      })
    }
  };
  const handleShiftId = (shiftIds) => {
    setShiftId(shiftIds);
    if (!state) {
      setPostformData({
        ...postformData,
        shiftId: shiftIds
      })
    }
    else {
      setformData({
        ...formData,
        shiftId: shiftIds

      })
    }
  };
  const onHandleChange = (id, value) => {
    const newdata = { ...formData }
    const postdata = { ...postformData }
    
    if(id === "emergencyContactNo" || id === "contactNo"){
      let newvalue = "+" + value
      if (!state) {
          postdata[`${id}`] = newvalue
          setPostformData(postdata)
        } else {
          newdata[`${id}`] = newvalue
          setformData(newdata)
        }
      }
      else{
        if (!state) {
          postdata[`${id}`] = value
          setPostformData(postdata)
        } else {
          newdata[`${id}`] = value
          setformData(newdata)
        }
      }
    }
 const onImageUpload = async () => {
    setImgLoad(true)
    let imagedata = document.getElementById('profile-image-upload').files[0];
    apiUploadToS3(imagedata).then((res) => {
      if (!state) {
        setPostformData({ ...postformData, imageUrl: res?.data?.result });
        setImgLoad(false);
      }
      else {
        setformData({ ...formData, imageUrl: res?.data?.result });
        setImgLoad(false);
      }
    }
    )
  }
  const HandleSubmit = (state) => {
    if (!state) {
      apiServices("POST", "user/adduser", { ...postformData, companyID: companyID }).then((res) => {
        if (res.data.success)
        message.success("Record Added Successfully!")
        dispatch(AddNewEmployee(formData))
        navigate('/management')
      }).catch((err)=>{
        message.error(`Error : ${err.response.data.msg ? err.response.data.msg : err.response.data.validation.body.message} `)
      })
    }
    else {
      apiServices("PUT", "user/updateuser", formData).then((res) => {
        if (res.data.success){
          if(formData.email === LocalData.email){
            let newLocalDatawithImage = {
              ...LocalData,
              img: formData.imageUrl
            }
            localStorage.clear("AuthObj")
            localStorage.setItem("AuthObj", JSON.stringify(newLocalDatawithImage))
          }
          message.success("Record Updated Successfully")
          navigate('/management')
        }
      }).catch((err) => {
        message.error(`Error : ${err.response.data.msg ? err.response.data.msg : err.response.data.validation.body.message} `)
      })
    }

  }

  const onSalaryChange = (value)=>{
    const newdata = { ...formData }
    const postdata = { ...postformData }

    if (!state) {
      postdata["salary"] = JSON.stringify(value)
      setPostformData(postdata)
    } else {
      newdata["salary"] = JSON.stringify(value)
      setformData(newdata)
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <Typography
            variant="h1"
            sx={{
              fontSize: "14px",
              marginTop:'10px',
              lineHeight: "19px",
              letterSpacing: "0.2em",
              marginBottom: "10px",
            }}
          >PROFILE PICTURE</Typography>
          {imgLoad
            ?
            <Spin />
            :
            <>
               {(formData?.imageUrl || postformData?.imageUrl) ?
                  <div style={{display: 'flex'}}>
                    <img src={state ? formData?.imageUrl : postformData?.imageUrl} alt='logo' style={{ height: '100px', width: '100px', borderRadius: '50%', marginBottom: '20px' }} />
                    <Tooltip title="Remove Image">

                      <ClearIcon sx={{
                        // marginBottom: '50px',
                        width: '20px',
                        height: '20px',
                        border: '1px solid red',
                        color: 'red',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        // alignSelf: 'flex-start',
                        // marginLeft: '-20px',

                        alignSelf: 'flex-start',
                        marginLeft: '-20px',
                        marginTop: '10px',

                        // padding:'20px',
                        borderRadius: '50%',
                        // margin: '20px',


                      }}
                        alt="Remove"

                        onClick={() => {
                          state ?
                            setformData({
                              ...formData,
                              imageUrl: ''
                            })
                            :
                            setPostformData({
                              ...postformData,
                              imageUrl: ''

                            })
                        }}>Remove</ClearIcon>
                    </Tooltip>
                  </div>
                  :
                  <>
                    <div className="UploadImage mt-4" style={{ display: 'flex', flexDirection: 'row' }}>
                      <label className="avtarImage">
                        {/* Upload Button */}
                        <Avatar size={68} icon={<UserOutlined />} style={{ width: '100px', height: '100px' }} />

                      </label>
                      <div style={{display: 'grid', justifyItems: 'center'}}>
                        <label style={{
                          border: "1px solid #000", padding: "20px ", marginLeft: "15px ", cursor: "pointer", width: '180px', height: '20px', marginTop: '30px', display: 'flex', alignItems: 'center', textAlign: 'center', borderRadius: '100px'
                        }}>
                          <Typography variant="span" sx={{ color: '#0098C9', letterSpacing: '0.1px', lineHeight: '20px' }}>Upload Profile Photo</Typography>
                          <input type="file" id="profile-image-upload"
                            onChange={onImageUpload} accept="image/png" />
                          </label>
                        <Typography variant="p" sx={{ fontSize: '10px', letterSpacing: '0.4px', color: '#49454' }}>PNG & JPEG Allowed</Typography>
                      </div>
                    </div>
                  </>
                }
            </>
          }
          <>
          </> 
        </div>
        <div className="Form1">
          <Form
            onSubmit={() => HandleSubmit(state)}
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "14px",
                marginTop: '20px',
                lineHeight: "19px",
                letterSpacing: "0.2em",
                marginBottom: "10px",
              }}
            >
              PERSONAL INFORMATION
            </Typography>
            <div className="row mt-4">
              <div className="row contactInput" style={{display: 'grid', gridTemplateColumns: 'auto 32% 32%', columnGap: '20px', marginLeft: '1px'}}>
                <Form.Item
                    label="Name"
                    name="employeeName"
                    rules={[
                      { required: true, message: "Please input employee name" },
                      { min: 3, message: 'Name should be more than 3 letters'}
                    ]}
                  >
                    <Input
                      type="text"
                      onChange={(e) => onHandleChange(e.target.id, e.target.value)} id="employeeName"
                      value={state ? formData.employeeName : postformData.employeeName}
                      defaultValue={state ? formData.employeeName : postformData.employeeName}
                      style={{borderRadius: '10px'}}
                    />
                </Form.Item>

                <Form.Item
                  label="Contact No"
                  name="contactNo"
                  rules={[
                    {
                      required: true,
                      message: "Please input contact no",
                    },
                    {
                      max: 15,
                      message: 'please input valid credentials'
                    }
                    // { type: "number", message: 'Please enter valid number' }
                  ]}
                  className="addContactNo"
                  id="contactNo"
                >
                  <PhoneNoInput
                    onChangePhone={(value)=>{
                      onHandleChange("contactNo", value)}}
                    phone={state ? formData.contactNo : postformData.contactNo}
                  />
                </Form.Item>
      
                <Form.Item
                  label="Date of Birth"
                  name="dateOfBirth"
                  rules={[
                    {
                      required: true,
                      message: "please input your Date of Birth",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: '100%', borderRadius: '10px' }}
                    value={state ? formData?.dateOfBirth : postformData?.dateOfBirth}
                    //  defaultValue={moment(state ? state?.dateOfBirth:'')}
                    defaultValue={state?.dateOfBirth ? moment(state?.dateOfBirth, 'YYYY-MM-DD') : postformData.dateOfBirth}
                    onChange={(e) => state ? setformData({ ...formData, dateOfBirth: e }) : setPostformData({ ...postformData, dateOfBirth: e })}
                  />
                </Form.Item>

                <Form.Item
                  label="Company Mailing ID"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please input valid email",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    onChange={(e) => onHandleChange(e.target.id, e.target.value)} id="email"
                    // onChange={(e)=>onHandleChange("devgateMailingId",e.target.value)}
                    style={{borderRadius: '10px'}}

                    value={state ? formData.email : postformData?.email}
                    defaultValue={state ? formData?.email : postformData?.email}
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password",
                    },
                    { min: 8, message: 'Please enter more than 8 letters' }
                  ]}
                >
                  <Input.Password
                    onChange={(e) => onHandleChange(e.target.id, e.target.value)} id="password"
                    value={state ? postformData.password : postformData.password}
                    defaultValue={state ? postformData.password : postformData.password}
                    disabled={state ? true : false}
                    style={{borderRadius: '10px'}}
                  />
                </Form.Item>

                <Form.Item
                  label="Employee ID"
                  name="cnicNumber"
                  rules={[
                    { required: true, message: "Please input company id" },
                    {max: 13, message: 'Please enter valid credentials'}
                    // { type: "number", message: 'Please enter valid credentials' }
                  ]}
                >
                  <Input
                    maxLength={13}
                    onChange={(e) => onHandleChange(e.target.id, e.target.value)} id="cnicNumber"
                    defaultValue={state ? state?.cnicNumber : ''}
                    value={state ? formData.cnicNumber : postformData.cnicNumber}
                    style={{borderRadius: '10px'}}
                  />
                </Form.Item>

                <Form.Item
                  label="Bank Account No"
                  name="accountNo" 
                  // rules={[
                  //   { type: "number", message: 'Please enter valid credentials' }
                  // ]}
                >
                  <Input
                    type="text"
                    onChange={(e) => onHandleChange(e.target.id, e.target.value)} id="accountNo"
                    value={formData.accountNo}
                    defaultValue={formData.accountNo}
                    style={{borderRadius: '10px'}}
                  />
                </Form.Item>

                <Form.Item
                  label="Emergency Contact No"
                  name="emergenContactNo"
                  className="emergencyContact"
                  id="emergencyContactNo"
                >
                  <PhoneNoInput
                     onChangePhone={(value)=>{
                      onHandleChange("emergencyContactNo", value)}}
                    phone={state ? formData.emergencyContactNo : postformData.emergencyContactNo}
                  />
                </Form.Item>
              </div>


            </div>
            <Typography
              variant="h1"
              sx={{
                fontSize: "14px",
                lineHeight: "19px",
                letterSpacing: "0.2em",
                marginBottom: "10px",
                marginTop: "20px",
              }}
            >
              EMPLOYMENT DETAILS
            </Typography>
            <div className="row mt-4">
            <div className="row" style={{ display: 'grid', gridTemplateColumns: 'auto 32% 32%', columnGap: '20px', marginLeft: '1px'}}>
                <Form.Item
                    label="Select Team"
                    name="team"
                    rules={[
                      {
                        required: true,
                        message: "Please select team",
                      },
                    ]}
                  >
                    <Select
                      name="teams"
                      id="teams"
                      allowClear
                      value={state ? formData.handleTeamId : postformData.handleTeamId}
                      onChange={(teamId) => handleTeamId(teamId)}
                      defaultValue={state ? state?.team : ''}
                    >
                      {employDetails?.teams?.map((item, index) => {
                        return (
                          <option key={index} value={item}>{item}</option>
                        )
                      })}
                    </Select>
                </Form.Item>

                <Form.Item
                  label="Select Role"
                  name="Role"
                  rules={[
                    {
                      required: true,
                      message: "Please select role",
                    },
                  ]}

                >
                  <Select
                    name="role"
                    id="role"
                    allowClear
                    style={{
                      width: '100%',
                    }}
                    value={state ? formData.handleRoleId : postformData.handleRoleId}
                    onChange={(roleId) => handleRoleId(roleId)}
                    defaultValue={state ? state?.role : ''}

                  >
                    {employDetails?.roles?.map((item, index) => {
                      return (

                        <Option key={index} value={item}>{item}</Option>
                      )
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Employment Type"
                  name="employeeType"
                  id="employeeType"
                  rules={[
                    {
                      required: true,
                      message: "Please select employment type",
                    },
                  ]}
                >
                  <Select
                    name='employeeTypeID'
                    id='employeeTypeID'
                    style={{
                      width: '100%',
                    }}
                    value={state ? formData.employeeType : postformData.employeeType}
                    onChange={(employTypeid) => handleEmployTypeid(employTypeid)}
                    defaultValue={state ? state?.employeeType : ''}
                  >
                    {employDetails?.employeeTypes?.map((item, index) => {
                      return (
                        <Option key={index} value={item}>{item}</Option>
                      )
                    })
                    }
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Joining Date"
                  name="employmentStartingDate"
                  rules={[
                    {
                      required: true,
                      message: "please input your joining date",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ width: '100%', borderRadius: '10px' }}
                    value={state ? formData.employmentStartingDate : postformData.employmentStartingDate}
                    defaultValue={state?.employmentStartingDate ? moment(state?.employmentStartingDate, 'YYYY-MM-DD') : "" }
                    onChange={(e, dateString) => {
                      state ? setformData({ ...formData, employmentStartingDate: dateString }) : setPostformData({ ...postformData, employmentStartingDate: dateString })
                    }
                  }
                  />
                </Form.Item>

                <Form.Item
                  label="Ending Date"
                  name="endingDate"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "please input your Ending Date",
                  //   },
                  // ]}
                >
                  <DatePicker
                    style={{ width: '100%', borderRadius: '10px' }}
                    value={state ? formData.employmentEndingDate : postformData.employmentEndingDate}
                    defaultValue={state?.employmentEndingDate ? moment(state?.employmentEndingDate, 'YYYY-MM-DD') : postformData.employmentEndingDate}
                    onChange={(e, dateString) => state ? setformData({ ...formData, employmentEndingDate: dateString }) : setPostformData({ ...postformData, employmentEndingDate: dateString })}
                  />
                </Form.Item>

                <FormItem
                  label="Reports to"
                  name="teamLead"
                  id="teamLead"
                >
                  <Select
                    style={{
                      width: '100%',
                    }}
                    allowClear
                    value={state ? formData.handleTeamLead : postformData.handleTeamLead}
                    onChange={(teamsLead) => handleTeamLead(teamsLead)}
                    defaultValue={state ? state?.teamLead : ''}
                  >
                    {teamLeads?.map((item, index) => {
                      return (
                        <option key={index} value={item?._id}>{item?.employeeName ? item?.employeeName : ' '}</option>
                      )
                    })}

                  </Select>

                </FormItem>

                <Form.Item
                  label="Salary"
                  name="salary"
                  rules={[
                    {
                      required: true,
                      message: "Please input salary",
                    },
                  ]}
                >
                  <InputNumber
                    id="salary"
                    maxLength={20}
                    style={{width: '100%', borderRadius: '10px'}}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={(value) => onSalaryChange(value)}
                    value={state ? formData.salary : postformData.salary}
                    defaultValue={state ? state.salary : ''} />
                </Form.Item>

                <Form.Item
                  label="Position Name "
                  name="positionName"
                  id="positionName"
                  rules={[
                    {
                      required: true,
                      message: "Please select position",
                    },
                  ]}
                >
                  <Select
                    name='employeeTypeID'
                    id='employeeTypeID'
                    style={{
                      width: '100%',
                    }}
                    value={state ? formData.handlePositionId : postformData.handlePositionId}
                    onChange={(positionId) => handlePositionId(positionId)}
                    defaultValue={state ? state?.positionName : ''}
                  >
                    {employDetails?.positionNames?.map((item, index) => {
                      return (
                        <Option key={index} value={item}>{item}</Option>
                      )
                    })
                    }
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Select Status"
                  name="employeeStatus"
                  id='employeeStatus'
                  rules={[
                    {
                      required: true,
                      message: "Please select status",
                    },
                  ]}
                >
                  <Select
                    value={state ? formData.handleStatusId : postformData.handleStatusId}
                    onChange={(statusId) => handleStatusId(statusId)}
                    defaultValue={state ? state?.employeeStatus : ''}
                    disabled={state ? true : false}
                  >
                    {
                      employDetails?.employeeStatuses?.map((item, index) => {
                        return (
                          <option key={index} value={item}>{item}</option>
                        )
                      })
                    }
                  </Select>
                </Form.Item>

                <FormItem
                  label="Shift"
                  name="shiftId"
                  id="shiftId"
                  rules={[
                    {

                      required: true,
                      message: "Please select shift"
                    }

                  ]}>
                  <Select
                    style={{
                      width: '100%',
                    }}
                    allowClear
                    value={postformData?.shiftId}
                    onChange={(shiftId) => handleShiftId(shiftId)}
                    defaultValue={state ? state?.shiftId : ''}

                  >
                    {shifts?.shift?.map((item, index) => {
                      return (
                        <Option key={index} value={item?._id}>{item?.title}</Option>
                      )
                    })}

                  </Select>
                </FormItem>

                <Form.Item
                  label="Probation Period (Months)"
                  name="probationPeriod"
                >
                  <Input
                    onChange={(e) => onHandleChange(e.target.id, e.target.value)} id="probationPeriod"
                    value={formData.probationPeriod}
                    defaultValue={state ? state.probationPeriod : ''}
                    style={{borderRadius: '10px' }}
                  />
                </Form.Item>

                <Form.Item
                  label="Allowed Casual Leaves"
                  name="casualLeaves"
                  id="casualLeaves"
                >
                  <Input
                    type="text"
                    maxLength={2}
                    onChange={(e) => onHandleChange(e.target.id, e.target.value)} id="casualLeaves"
                    value={state ? formData.casualLeaves : postformData.casualLeaves}
                    defaultValue={state ? state.casualLeaves : ''}
                    style={{borderRadius: '10px' }}

                  />
                </Form.Item>

                <Form.Item
                  label="Allowed Sick Leaves"
                  name="sickLeave"
                >
                  <Input
                    type="text"
                    maxLength={2}
                    onChange={(e) => onHandleChange(e.target.id, e.target.value)} id="sickLeaves"
                    value={state ? formData.sickLeaves : postformData.sickLeaves}
                    defaultValue={state ? state.sickLeaves : ''} 
                    style={{borderRadius: '10px'}}
                    />
                </Form.Item>
              </div>
            </div>

            <Form.Item>
              <div className="Btn">
                <Button type="submit" onClick={(e) => { e.preventDefault(); HandleSubmit(state) }}>
                  Save changes
                </Button>
              </div>
            </Form.Item>
          </Form>

        </div>
      </div>
    </div>
  )
}
export default AddEmploy;