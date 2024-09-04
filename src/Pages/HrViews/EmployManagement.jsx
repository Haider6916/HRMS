import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { theme } from "../../themes/ColorPallete";
// redux dispatch
import { useDispatch, useSelector } from "react-redux";
// 4-apicalls
import { getEmployees } from "../../Redux/EmployeeRedux/apicalls";
import { Link } from "react-router-dom";
import { Button, Typography, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { apiServices } from "../../Services/apiServices";
import moment from "moment";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import TablePagination from '@mui/material/TablePagination';

// Modal 

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useAuth from "../../hooks/useAuth";

const EmployManagement = () => {

  const { auth } = useAuth();
  // const token = auth?.acesstoken;
  // const token = auth?.acesstoken;

  // localStorage.setItem("Token", JSON.stringify(token))

  const handleRowSelection = (type, data) => {

    if (type === "Selectvalue") {
      navigate(`/profile/`, { state: data });
    }
  }
  const currentemployee = useSelector((state) => state?.employees);

  const [employeeDetails, setEmployeeDetails] = React.useState(
    currentemployee !== {} ? currentemployee?.employees?.User : {}
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employeeObj = React.useMemo(
    () => (currentemployee.User),
    []
  );

  useEffect(() => {
    getEmployees(dispatch)
  }, []);


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
  const deleteUser = async (userId) => {
    apiServices('DELETE', 'user/deleteuser', userId).then((res) => {

      if (res.data.success === true) {
        setEmployeeDetails(current =>
          current.filter(employee => {
            return employee._id !== userId;
          })
        )
        setOpen(false)

      }
    }
    )
  }

  const Edit = () => {
    navigate("/profile")
  };

  // add employee
  const AddEmploy = (type, data) => {

    if (type === "addEmployee") {
      navigate("/AddEmploy", { state: null });

    } else if (type === "editEmployee") {
      navigate("/AddEmploy", { state: data });

    }
  };

  const columns = [
    {
      field: "employeeName", headerName: "Name", width: 150,
      renderCell: (params) => {
        return (
          <>
            <Avatar src={params.row.imageUrl} />
            <Typography sx={{ marginLeft: '5px' }}>
              {params?.row?.employeeName}
            </Typography>
          </>
        )
      },
    },
    {
      field: "designation",
      headerName: "DESIGNATION",
      width: 150,
      valueGetter: (params) => {
        return params?.row?.roleID?.role;
      },
    },
    {
      field: "teamName",
      headerName: "TEAM",
      width: 150,
      valueGetter: (params) => {
        return params?.row?.teamID?.teamName;
      },
    },
    {
      field: "employeeStatusName",
      headerName: "STATUS",
      width: 150,
      valueGetter: (params) => {
        return params?.row?.employeeStatusID?.employeeStatusName;
      },
    },
    { field: "email", headerName: "EMAIL ADDRESS", width: 150 },
    {
      field: "employmentStartingDate", headerName: "JOINING DATE", width: 150,
      valueFormatter: params =>
        moment(params?.value).format('YYYY-MM-DD')



    },
    { field: "contactNo", headerName: "CONTACT NUMBER", width: 150 },
    {
      field: "edit ",
      headerName: "ACTIONS",
      width: 70,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <>

            <Button
              variant="contained"
              LinkComponent={Link}
              onClick={(event) => { event.stopPropagation(); AddEmploy("editEmployee", params?.row) }}
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
          </>

        );
      },
    },
    {
      field: "delete",
      headerName: "",
      width: 60,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Button
            onClick={(event) => {
              event.stopPropagation();
              handleOpen(); setUserId(params?.row)
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
        );
      },
    },
  ];
  return (
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
        <DataGrid
          getRowId={(row) => row._id}
          rows={employeeDetails || {}}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onSelectionModelChange={(id) => {
            const selectedIDs = new Set(id);
            const selectedRowData = employeeDetails.filter((row) =>
              selectedIDs.has(row._id.toString())
            );
            handleRowSelection("Selectvalue", selectedRowData)
          }
          }
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
                <Typography variant='p' sx={{ fontSize: '16px', lineHeight: '24px', textAlign: 'center' }}>By Deactivating Employee  "{userId?.requestType}"  that you wont be able to see the user data anymore.</Typography>


              </div>
            </div>
            <div className="row" style={{ margin: '54px 0px 0px 0px' }}>
              <div className="col-12">
                <div className="fotter" style={{ float: 'right', marginTop: '60px', borderRadius: '20px' }}>
                  <Button variant="outlined" sx={{ margin: '10px', borderRadius: '20px', color: '#1C1E23', letterSpacing: '0.1' }} onClick={handleClose}>Discard</Button>
                  <Button variant="contained" sx={{ borderRadius: '20px', background: '#FF5630', letterSpacing: '0.1' }} onClick={() => deleteUser(userId._id)}>Deactivate</Button>

                </div>
              </div>

            </div>
          </div>

        </Box>
      </Modal>
    </div>
  );
};
export default EmployManagement;
