import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../../themes/ColorPallete";
import { Link } from "react-router-dom";
import { Button, Typography, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { apiServices } from "../../Services/apiServices";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Tabs, Table, Skeleton, message, Pagination } from "antd";
import './style.css'
import moment from "moment";
import UserProfileInfoComp from "../../Components/UserProfileInfoComp";
import './EmployManagement.css'

const EmployManagement = () => {

  const [employeeDetails,setEmployeeDetails] = useState([])
  const [disabledEmployees, setDisabledEmployees] = useState([])

  const [loader, setLoader] = useState(true)
  const [activeLoader, setactiveLoader] = useState(false)
  const [disabledLoader, setdisabledLoader] = useState(false)
  const [activePagination, setActivePagination] = useState(1)
  const [employeeData, setEmployeeData] = useState({
    isShown: false,
    empData: {}
  })


  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState({})

  const navigate = useNavigate();
  
    
  useEffect(() => {
    getActiveUsers()
    getDisabledUsers()
  }, []);

const backHandle = () => {
  setEmployeeData({
    isShown: false,
    empData: {}
  })
}
  const getActiveUsers = (page)=>{
    if(page){
      apiServices('GET', `user/viewuser/?page=${page}&limit=10`).then(res => {
        // console.log('res?.data?.activeUser===>', res?.data?.activeUser)
        setEmployeeDetails(res?.data?.activeUser)
        // setDisabledEmployees(res?.data?.disabledUser)
        setactiveLoader(false)
        setLoader(false)
      })
    }else{
      apiServices('GET', `user/viewuser`).then(res => {
        // console.log('res?.data?.activeUser===>', res?.data?.activeUser)
        setEmployeeDetails(res?.data?.activeUser)
        // setDisabledEmployees(res?.data?.disabledUser)
        setLoader(false)
      })
    }
  }

  const getDisabledUsers = (page)=>{
    if (page) {
      apiServices('GET', `user/viewdisableduser/?page=${page}&limit=10`).then(res => {
        setDisabledEmployees(res?.data?.disabledUser)
        setdisabledLoader(false)
      })
    } else {
      apiServices('GET', `user/viewdisableduser`).then(res => {
        setDisabledEmployees(res?.data?.disabledUser)
      })
    }
  }



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
    // border: '2px solid',
    borderRadius: 2,
    boxShadow: 24,
    paddingTop: 5
  };
  const deleteUser = async (userId) => {
    apiServices('DELETE', 'user/deleteuser', userId._id).then((res) => {
      if (res.data.success === true) {
        let remainingEmployees = employeeDetails.docs.filter(employee => {
          return employee._id !== userId._id;
        })
        setEmployeeDetails({
          ...employeeDetails,
          docs: [
            ...remainingEmployees
          ]
        })
        setOpen(false)
        setDisabledEmployees({
          ...disabledEmployees,
          docs:[
            {
              ...userId,
              employeeStatus: "In-Active"
            },
           ...disabledEmployees.docs,
          ]
        }
        )
        message.success(`${userId?.employeeName} Disabled Successfully!`)
      }
    })
  }


  const AddEmploy = (type, data) => {
    if (type === "addEmployee") {
      navigate("/AddEmploy", { state: null });
    } else if (type === "editEmployee") {
      navigate("/AddEmploy", { state: data });
    }
  };

  const enableUser = (enableUser)=>{
    apiServices('PUT', 'user/enableuser', { _id: enableUser._id}).then((res) => {
      if (res.data.success === true) {
        let remainingEmployees = disabledEmployees.docs.filter(employee => {
          return employee._id !== enableUser._id;
        })
        setDisabledEmployees({
          ...disabledEmployees,
          docs: [
            ...remainingEmployees
          ]
        })

        setEmployeeDetails({
          ...employeeDetails,
          docs: [
            {
              ...enableUser,
              employeeStatus: "Active"
            },
            ...employeeDetails.docs,
          ]
        }
        )
        message.success(`${enableUser?.employeeName} Enabled Successfully!`)

      }
    }).catch((err)=>{
      message.error(`${enableUser?.employeeName} moved to active employees failed!`)
    })

  }

  const columnsTable = [
    {
      title: 'Emp ID.',
      dataIndex: 'cnicNumber',
      key: 'Emp_ID',
      render: (record, row) => {
        return ( 
          <span
          className="empIDstyle"
          onClick={() => {
            setEmployeeData({
              isShown: true,
              empData: row
            });
          }}
          >
            {record}
          </span>
        )}
    },
    {
      title: 'Name',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'Designation',
      dataIndex: 'positionName',
      key: 'positionName',
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
    },
    {
      title: 'Status',
      dataIndex: 'employeeStatus',
      key: 'employeeStatus',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Starting Date',
      dataIndex: 'updatedAt',
      key: 'employmentStartingDate',
      render: (record, row) => {
        return ( 
          <span>
            {moment(record).format('DD-MM-YYYY') }
          </span>
        )}
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (record, row) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly"
            }}
          >
            <Button
              variant="contained"
              LinkComponent={Link}
              onClick={(event) => { event.stopPropagation(); AddEmploy("editEmployee", row) }}
              // to={`/profile/${params.row._id}`} 
              sx={{
                backgroundColor: "rgba(0, 152, 201,0.2)",
                color: "#0098C9",
                width: "30px",
                height: "30px",
                minWidth: '30px',
                borderRadius: "10px",
                border: "none",
                textAlign: 'center',
                "&:hover": {
                  background: "#006fc9",
                  color: "#fff",
                },
              }}

            > <EditIcon sx={{ fontSize: '16px' }} /></Button>

            <Button
              onClick={(event) => {
                event.stopPropagation();
                handleOpen(); setUserId(row)
              }}

              sx={{
                background: "rgba(255, 86, 48, 0.2)",
                color: "red",
                width: "30px",
                height: "30px",
                minWidth: '30px',
                borderRadius: "10px",
                border: "none",
                "&:hover": {
                  background: "rgba(255, 86, 48, 1)",
                  color: "#fff",
                },
              }}

            ><DeleteOutlineOutlinedIcon sx={{ fontSize: '16px' }} /></Button>

          </div>
        )
      }
    },
  ];

  const DisabledColumnsTable = [
    
    {
      title: 'Emp ID.',
      dataIndex: 'cnicNumber',
      key: 'Emp_ID',
      render: (record, row) => {
        return ( 
          <span
          className="empIDstyle"
          onClick={() => {
            setEmployeeData({
              isShown: true,
              empData: row
            });
          }}
          >
            {record}
          </span>
        )}
    },
    {
      title: 'Name',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'Designation',
      dataIndex: 'positionName',
      key: 'positionName',
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
    },
    {
      title: 'Status',
      dataIndex: 'employeeStatus',
      key: 'employeeStatus',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Starting Date',
      dataIndex: 'updatedAt',
      key: 'employmentStartingDate',
      render: (record, row) => {
        return (
          <span>
            {moment(record).format('DD-MM-YYYY')}
          </span>
        )
      }
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (record, row) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly"
            }}
          >
            <Button
              variant="contained"
              LinkComponent={Link}
              onClick={(event) => { event.stopPropagation(); enableUser(row) }}
              sx={{
                backgroundColor: "rgba(0, 152, 201,0.2)",
                color: "#0098C9",
                height: "30px",
                minWidth: '30px',
                borderRadius: "10px",
                border: "none",
                textAlign: 'center',
                "&:hover": {
                  background: "#006fc9",
                  color: "#fff",
                },
              }}

            > 
                <span>
                  Enable
                </span>
             </Button>
          </div>
        )
      }
    },
  ];

  const onChangePageActive = (page) => {
    setactiveLoader(true)
    getActiveUsers(page)
    setActivePagination(page);
  }


  const onChangePageDisabled =(page)=>{
    setdisabledLoader(true)
    getDisabledUsers(page)
  }

  
  const TabActiveEmployees = (
    <div className="tab_data">
      { loader ?
      <>
        <Skeleton active />
      </>
      :
      activeLoader
        ?
        <>
          <Skeleton active />
        </>
        :
        <>
        <Table dataSource={employeeDetails?.docs} columns={columnsTable} pagination={false}/>
        </>
      }
        <div style={{float: 'right'}} className="mt-3 mb-4">
          <Pagination
            pageSize={employeeDetails?.limit ? employeeDetails?.limit : 0}
            current={activePagination}
            total={employeeDetails?.total ? employeeDetails?.total : 0}
            onChange={onChangePageActive}
          />
        </div>
    </div>
  )

  const TabDisabledEmployees = (
    <div className="tab_data">  
      {disabledLoader
        ?
        <>
          <Skeleton active />
        </>
        :
        <>
        <Table dataSource={disabledEmployees?.docs} columns={DisabledColumnsTable} pagination={false} />
        </>
      }
      <div style={{ float: 'right' }} className="mt-3 mb-4">
        <Pagination
          pageSize={disabledEmployees?.limit ? disabledEmployees?.limit : 10}
          defaultCurrent={disabledEmployees?.page ? disabledEmployees?.page : 1}
          total={disabledEmployees?.total ? disabledEmployees?.total : 0}
          onChange={onChangePageDisabled}
        />
      </div>
    </div>
  )
 
  return (
    <>
    {employeeData.isShown ?

    <UserProfileInfoComp
      empData={employeeData.empData}
      backHandle={backHandle}
      enableUser={enableUser}
      deleteUser={deleteUser}
      />
  
    :
    <div className="container-fluid">
      <div className="row" style={{ marginTop: "70px" }}>
        <div className="col-6  pt-4 pb-4">
          <div className="header">
            <Typography
              variant="h4"
              sx={{
                color: `${theme.palette.secondary.contrastText}`,
                fontSize: "30px",
                fontStyle: "normal",
                lineHeight: "40px",
              }}
            >
              {" "}
              Management
            </Typography>
          </div>
        </div>

        <div
          className="col-6 pt-4 pb-4"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            onClick={() => AddEmploy("addEmployee")}
            sx={{
              color: `${theme.palette.primary.contrastText}`,
              width: "150px",
              height: "50px",
              borderRadius: "50px",
            }}
          >
            + ADD EMPLOYEE
          </Button>
        </div>
      </div>
      <div style={{ height: "100vh", width: "100%", background: "#fff" }}>
        <Tabs
          defaultActiveKey="1"
          // onChange={onChangeTabs}
          items={[
            {
              label: `Active Employees`,
              key: '1',
              children: TabActiveEmployees,
            },
            {
              label: `Disabled Employees`,
              key: '2',
              children: TabDisabledEmployees,
            },
          ]}
        />
        
      </div>
      {/*  */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="BoxModal">
            <div className="row">
              <div className=" offset-10 col-2" style={{ height: '30px' }}>
                <Button sx={{ float: 'right', width: '100%', height: '14px', background: 'none', color: 'rgba(31, 31, 31, 0.7)' }} onClick={handleClose}><CloseOutlinedIcon /></Button>
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
                  <Button variant="outlined" sx={{ margin: '10px', borderRadius: '20px', color: '#1C1E23', letterSpacing: '0.1' }} onClick={handleClose}>Discard</Button>
                  <Button variant="contained" sx={{ borderRadius: '20px', background: '#FF5630', letterSpacing: '0.1' }} onClick={() => deleteUser(userId)}>Deactivate</Button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  }
    </>
  );
};
export default EmployManagement;
