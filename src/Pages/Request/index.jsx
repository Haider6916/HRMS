import React, { useEffect, useState } from 'react'
import { message, Spin, Table,Modal } from 'antd';
import { Button, Tabs } from 'antd';
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { apiServices } from '../../Services/apiServices';
// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
// import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import './requestStyle.css'
import SendRequestModal from '../../Components/RequestModals/SendRequestModal';
import CreateRequestModal from '../../Components/RequestModals/CreateRequestModal';
import { CheckOutlined, CloseOutlined} from '@mui/icons-material';
import  Delete_icon from '../../Assets/Icons/Delete_icon.svg';
import  Edit_icon from '../../Assets/Icons/Edit_icon.svg';

const MyRequest = () => {
    const [isDisableReqButton, setIsDisabledReqButton] = useState(true);
    const [descriptionCounter, setDescsriptionCounter] = useState(0);
    let user = JSON.parse(localStorage.getItem('AuthObj'))
    let userId = user.userId
    //Self Request
    const [request, setRequest] = useState({})
    // Employees Requests
    const [employeesRequests, setEmployeesRequests] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalValue, setModalValue] = useState("")
    
    const AuthObj = JSON.parse(localStorage.getItem('AuthObj'));
    // RequestModal States
    const [createRequestModal, setCreateRequestModal] = useState(false)
    const [sendRequestModal, setSendRequestModal] = useState(false)
    const [NewRequestMade, setNewRequestMade] = useState({
        requestType: '',
        leaveType: 'Sick',
        startDate: '',
        endDate:'',
        description: '',
    })
    const [editReq, setEditReq] = useState(false)
    const [disableFields, setdisableFields] = useState(false)


    const [requestedUser, setRequestedUser] = useState({
        user: "",
        type: '',
        open: false
    })
    //table columns
    const myRequestcolumns = [
        {
            title: 'TITLE',
            dataIndex: 'requestType',
            key: 'title',
             render:(record)=>{
                return(
                    <span style={{color:'#000000A6' ,fontFamily:'Open Sans',  fontSize: '14px'}}> 
                        <strong> 
                            {record === "wfh" && 'Work From Home Request'} 
                            {record === "leave" && 'Leave Request'} 
                            {record === "equipment" && 'New Equipment Request'} 
                        </strong>
                    </span> 
                )
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'issue',
             render:(record)=>{
                return(
                    <div
                       style={{width: 200, textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            color:"#00000080",fontFamily: 'Open Sans', fontSize: '14px'
                        }}
                    >
                        {record}
                    </div>
                )}
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render:(record)=>{
                return(
                       <span
                            className= {record === 'Pending' ? 'pending-status' : record === "Approved" ? 'success-status' : 'rejected-status'}  
                       >◉ {record} </span> 
                )
            }

        },
        {
            title: 'Role',
            dataIndex: 'approvedBy',
            key: 'approvedBy',
            render: (record) => {
                return (
                    <span style={{color:'#000000A6' ,fontFamily: 'Open Sans', fontSize: '14px'}}> {record} </span>
                )
            }

        },
        {
            title: 'DATE',
            dataIndex: 'createdAt',
            key: 'date',
            render: (record) => {
                return (
                    <span style={{color: 'rgb(173 173 173)'}}>
                        <strong>{record.split('T')[0]} </strong> , {record.split('T')[1].split(".")[0]}
                    </span>
                )

            }
        },
        {
            title: 'ACTIONS',
            // dataIndex: 'address',
            render: (record) => {
                return (
                    <>
                        {(record.status === "Approved" || record.status === "Declined")
                                ? <>
                                    <Button type="primary"
                                        onClick={() => onViewRecord(record)}
                                        style={{ borderRadius: '20px', marginRight: '10px', background: '#1890ff', color: '#fff', border: 'none' }}
                                    > View </Button>
                                </>
                                :
                            <>
                            <Button 
                                onClick={() => {
                                    setdisableFields(false)
                                    editRequest(record)
                                    setIsDisabledReqButton(false)
                                }}
                                style={{ borderRadius: '10px', marginRight: '10px' , backgroundColor:'#CCEAF4', border: 'none' }}


                                LinkComponent={Link}
                                icon={ 
                                <img src={Edit_icon} 
                                style={{marginBottom:'5px'}}
                                />}

                            />
                            <Button 
                                onClick={() => showModal(record)}
                                style={{ borderRadius: '10px', marginRight: '10px', backgroundColor:'#FFDDD6',  border: 'none'  }}

                                LinkComponent={Link}
                                icon={
                                 <img src={Delete_icon}
                                style={{marginBottom:'5px'}}
                                />}
                            />
                            </>
                        }
                    </>
                )
            }



        },
    ];

    //employee cloumns
     const employeeRequestcolumns = [
         {
             title: 'Name',
             dataIndex: 'userId',
             key: 'name',
             render: (record) => {
                 return (
                     <span style={{color:'#000000A6' ,fontFamily: 'Open Sans', fontSize: '14px'}}>
                         <strong>   
                             {record?.employeeName}
                         </strong>
                     </span>
                 )
             }
         },
        {
            title: 'TITLE',
            dataIndex: 'requestType',
            key: 'title',
             render:(record)=>{
                return(
                    <span> 
                        <strong style={{color:'#000000A6' ,fontFamily: 'Open Sans', fontSize: '14px'}}> 
                            {record === "wfh" && 'Work From Home Request'} 
                            {record === "leave" && 'Leave Request'} 
                            {record === "equipment" && 'New Equipment Request'} 
                        </strong>
                    </span> 
                )
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'issue',
             render:(record)=>{
                return(
                    <div
                       style={{width: 200, textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            color:'#000000A6' ,fontFamily: 'Open Sans', fontSize: '14px'
                        }}
                    >
                        {record}
                    </div>
                )}
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render:(record)=>{
                return(
                       <span style={{color:'#000000A6' ,fontFamily: 'Open Sans', fontSize: '14px'}}
                            className= {record === 'Pending' ? 'pending-status' : record === "Approved" ? 'success-status' : 'rejected-status'}  
                       >◉ {record} </span> 
                )
            }

        },
        {
            title: 'DATE',
            dataIndex: 'createdAt',
            key: 'date',
            render: (record) => {
                return (
                    <span style={{color: 'rgb(173 173 173)',
                    color:'#000000A6' ,fontFamily: 'Open Sans', fontSize: '14px'
                    }}>
                        <strong>{record.split('T')[0]} </strong> , {record.split('T')[1].split(".")[0]}
                    </span>
                )

            }
        },
        {
            title: 'ACTIONS',
            // dataIndex: 'address',
            render: (record) => {
                return (
                    <>
                       {(record.status === "Approved" || record.status === "Declined")
                            ? <>
                                <Button type="primary"
                                    onClick={() => onViewRecord(record)}
                                    style={{ borderRadius: '20px', marginRight: '10px', background: '#1890ff', color: '#fff', border: 'none' }}
                                > View </Button>
                            </>
                            :
                            <div style={{display: 'flex'}}>
                                <Button
                                    onClick={() => onViewRecord(record)}
                                    LinkComponent={Link}
                                    style={{ borderRadius: '20px', marginRight: '10px', background: '#1890ff52', color: '#1890ff', border: 'none' }}
                                    icon={<EyeOutlined />}
                                />

                                <Button type="danger"
                                    onClick={() => {
                                    //    editRequest(record)
                                        setRequestedUser({
                                            user: record,
                                            type: 'reject',
                                            open: true
                                        })
                                    }}
                                    style={{ borderRadius: '20px', marginRight: '10px', background: 'rgba(172, 42, 13, 0.5)' , color: 'rgba(172, 42, 13, 1)', border: 'none' }}
                                    // rgba(172, 42, 13, 1)
                                    LinkComponent={Link}
                                    icon={<CloseOutlined />}
                                />

                                <Button type="primary"
                                    onClick={() => {
                                        setRequestedUser({
                                            user: record,
                                            type: 'accept',
                                            open: true
                                        })
                                    } }
                                    style={{ borderRadius: '20px', marginRight: '10px', background: 'rgba(56, 203, 137, 0.5)' , color: 'rgba(56, 203, 137, 1)', border: 'none'}}
                                    LinkComponent={Link}
                                    icon={<CheckOutlined />}
                                />
                            </div>
                       }
                    </>
                )
            }
        },
    ];



    useEffect(() => {
        getSelRequests()
        getEmpRequests()
    }, [])




    const showModal = (record) => {
        setModalValue(record)
        setIsModalVisible(true);
    };


    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


        //get REQUESTS
    const getSelRequests = (page) => {
        if(page){
            apiServices("GET", `requests/viewselfrequest/?page=${page}&limit=10`).then(res => {
                setRequest(res?.data?.SelfRequests);
                // setEmployeesRequests(res?.data?.Requests)
                setLoading(false)
            })
        }else{
            apiServices("GET", `requests/viewselfrequest/?page=${1}&limit=10`).then(res => {
                setRequest(res?.data?.SelfRequests);
                // setEmployeesRequests(res?.data?.Requests)
                setLoading(false)
            })

        }
    }

    const getEmpRequests = (page) => {
        if (page) {
            apiServices("GET", `requests/viewallrequest/?page=${page}&limit=10`).then(res => {
                // setRequest(res?.data?.SelfRequests);
                setEmployeesRequests(res?.data?.Requests)
                setLoading(false)
            })
        } else {
            apiServices("GET", `requests/viewallrequest/?page=${1}&limit=10`).then(res => {
                // setRequest(res?.data?.SelfRequests);
                setEmployeesRequests(res?.data?.Requests)
                setLoading(false)
            })

        }
    }

    // CreateNew Request function
    const onCreateNewReq = (reqMade)=>{
        setEditReq(false)
        // close prev modal
        setCreateRequestModal(false)
        // set Type for Modal
        setNewRequestMade({
            requestType: reqMade,
            leaveType: '',
            startDate: '',
            endDate:'',
            description: '',
        })
        // open new modal
        setSendRequestModal(true)
    }
    //select edited request
    const editRequest =(record)=>{
        setEditReq(true)
        setNewRequestMade({
            ...record
        })
        setSendRequestModal(true)
    }

    //view model
    const onViewRecord = (record)=>{
        console.log('on view record====>',record)
        setdisableFields(true)
        setNewRequestMade({
            ...record
        })
        setSendRequestModal(true)
    }

    //Add new Request or edit request
    const onSendRequest = (type) =>{
        if(type === "add"){
            if(NewRequestMade.requestType === "wfh" || NewRequestMade.requestType === "equipment"){
            setNewRequestMade({
                ...NewRequestMade,
                leaveType: ''
            })
            let data = {
                userId: userId,
                ...NewRequestMade,
                leaveType: ''
            }
            apiServices("POST",`requests`, data)
                .then(res=>{
                    setNewRequestMade({
                        requestType: '',
                        leaveType: '',
                        startDate: '',
                        endDate:'',
                        description: '',
                    })
                    setRequest({
                        ...request,
                        docs:[
                            {
                                ...res?.data?.Request
                            },
                            ...request.docs
                        ]
                    })
                    message.success("Request Added!")
                    setSendRequestModal(false)
                }).catch((err)=>{
                    message.error(err?.response?.data?.validation?.body?.message ? err?.response?.data?.validation?.body?.message : err?.response?.data?.msg === "error server error" ? err?.response?.data?.error : err?.response?.data?.msg)
                })
            }else{
                    apiServices("POST",`requests`, 
                        {
                            ...NewRequestMade,
                            userId: userId,
                        })
                        .then(res=>{
                            setRequest({
                                ...request,
                                docs:[
                                    {
                                        ...res?.data?.Request
                                    },
                                    ...request.docs
                                ]
                            })
                            setNewRequestMade({
                                requestType: '',
                                leaveType: '',
                                startDate: '',
                                endDate:'',
                                description: '',
                            })
                            message.success("Request Added!")
                            setSendRequestModal(false)
                    }).catch((err)=>{
                        message.error(err?.response?.data?.validation?.body?.message ? err?.response?.data?.validation?.body?.message : err?.response?.data?.msg === "error server error" ? err?.response?.data?.error : err?.response?.data?.msg)  
                        })
            }
        }else{
             apiServices("PUT",`requests`, NewRequestMade).then(res=>{
                const newState = request?.docs.map(obj =>{
                        if (obj._id === NewRequestMade._id) {
                      return {
                        ...obj,
                        startDate: NewRequestMade.startDate,
                        endDate:  NewRequestMade.endDate,
                        description: NewRequestMade.description
                      };
                    }
                    return obj;
                  })
                setRequest({
                    ...request,
                    docs:[...newState]
                })
                setNewRequestMade({
                                requestType: '',
                                leaveType: '',
                                startDate: '',
                                endDate:'',
                                description: '',
                            })
                            message.success("Request Added!")
                            setSendRequestModal(false)
            }).catch((err) => {
                message.error(err?.response?.data?.validation?.body?.message ? err?.response?.data?.validation?.body?.message : err?.response?.data?.msg === "error server error" ? err?.response?.data?.error : err?.response?.data?.msg)
            })
        }
    }

    //del req
    const deleteRequest = () => {
        apiServices('DELETE', 'requests/', modalValue?._id).then((res) => {
            if (res.data.success === true) {
                // setRequest
                let RemainingRequests = request?.docs?.filter(req => {
                    return req._id !==  modalValue?._id;
                });
                setRequest({
                    ...request,
                    docs: [...RemainingRequests]
                })
                setIsModalVisible(false)
            }
        })

    }

    //ADMIN ACTIONS
    // Accept Req
    const onAcceptRequest =(record)=>{
        let NewRequestMade = {
            ...record,
             status: "Approved",
            approvedBy:  AuthObj.role
        }
         apiServices("PUT",`requests`, NewRequestMade).then(res=>{
                const newState = employeesRequests?.docs.map(obj =>{
                        if (obj._id === NewRequestMade._id) {
                      return {
                        ...obj,
                        status: "Approved",
                      };
                    }
                    return obj;
                  })
                setEmployeesRequests({
                    ...employeesRequests,
                    docs:[...newState]
                })
                setRequestedUser({
                    user: '',
                    type: '',
                    open: false
                })
            })
    }

    const onCancelRequest = (record)=>{
       
        let NewRequestReject = {
            ...record,
            status: "Declined",
            approvedBy:  AuthObj.role,
        }
         apiServices("PUT",`requests`, NewRequestReject).then(res=>{
            
             const newState = employeesRequests?.docs.map(obj =>{
                 if (obj._id === NewRequestReject._id) {
                      return {
                        ...obj,
                        status: "Declined",
                      };
                    }
                    return obj;
                  })
                setEmployeesRequests({
                    ...employeesRequests,
                    docs:[...newState]
                })
                setRequestedUser({
                    user: '',
                    type:'',
                    open: false
                })
            })
    }

    return (
        <>
            <div className='row heading mt-6 pt-5'>
                <div className='col-12 col-lg-6 '>
                    <Typography variant='h4'>Requests</Typography>
                </div>
                <div className='col-12 col-lg-6' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {(user.role === "CEO")
                        ?
                        null
                        :
                        <Button
                            variant="contained"
                        type="primary"
                            onClick={()=>{
                                setdisableFields(false)
                                setCreateRequestModal(true)
                                setIsDisabledReqButton(true)
                                setDescsriptionCounter(0)
                            }}
                            style={{borderRadius: '20px', height: '40px'}}
                        >
                            + Add New Request
                        </Button>
                    }
                </div>
            </div>
            <div className='row table_req'>
                <div className='col-12 col-lg-12'>
                    <Tabs
                         defaultActiveKey="1"
                         
                    >
                        {(user.role === "CEO")
                           ?
                           null
                           :
                            <Tabs.TabPane tab="Requests Sent" key="1">
                                {loading
                                    ? <Spin size="small" />
                                    :
                                    <Table  columns={myRequestcolumns} dataSource={request?.docs}
                                        pagination={{
                                            pageSize: 10,
                                            total: request.total,
                                            onChange: (page) => {
                                                getSelRequests(page)
                                            }
                                        }}
                                        
                                    />
                                }
                            </Tabs.TabPane>
                        }
                        {(user.role === "Employee")
                            ?
                            null
                            :
                            <Tabs.TabPane tab="Requests Received" key="2">
                                {loading
                                    ? <Spin size="small" />
                                    :
                                    <Table columns={employeeRequestcolumns} dataSource={employeesRequests?.docs}
                                        pagination={{
                                            pageSize: 10,
                                            total: employeesRequests.total,
                                            onChange: (page) => {
                                                getEmpRequests(page)
                                            }
                                        }}
                                    />
                                }
                            </Tabs.TabPane>                             
                        }                        
                    </Tabs>
                </div>
            </div>
            <Modal
                // title="Basic Modal"
                centered
                className="delete-modal"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                style={{
                    border: 'none !important'
                }}
            >
                    <div className="BoxModal">
                        
                        <div className="row">
                            <div className="col-12"
                                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', padding: '0px 116px' }}>
                                <span><CancelOutlinedIcon sx={{ fontSize: "83px ", fontWeight: 500, color: '#FF5630' }} /></span>
                                <Typography variant='h5' sx={{ fontSize: '24px', lineHeight: '40px', margin: '20px 0px 10px 0px' }}>Are you sure?</Typography>
                                <Typography variant='p' sx={{ fontSize: '16px', lineHeight: '24px', textAlign: 'center' }}>you want to delete your "{modalValue?.requestType}"</Typography>
                            </div>
                        </div>
                        <div className="row mt-5" >
                            <div className="col-12">
                                <div className="fotter" style={{ float: 'right'}}>
                                    <Button variant="outlined" style={{borderRadius: '20px', marginRight: '10px'}} onClick={handleCancel}>No</Button>
                                    <Button type="danger" style={{ borderRadius: '20px', background: '#FF5630'}} onClick={deleteRequest}>Yes</Button>
                                </div>
                            </div>
                        </div>
                    </div>
            </Modal>


            {/* MODAL FOR REQUESTS */}
            <CreateRequestModal 
                createRequestModal={createRequestModal} 
                setCreateRequestModal={setCreateRequestModal}
                onCreateNewReq={onCreateNewReq}
            />
            <SendRequestModal 
                editReq={editReq}
                disableFields={disableFields}
                sendRequestModal={sendRequestModal}
                NewRequestMade={NewRequestMade}
                setSendRequestModal={setSendRequestModal}
                setNewRequestMade={setNewRequestMade}
                onSendRequest={onSendRequest}
                isDisableReqButton={isDisableReqButton}
                setIsDisabledReqButton={setIsDisabledReqButton}
                descriptionCounter={descriptionCounter}
                setDescsriptionCounter={setDescsriptionCounter}
            />


            <Modal
                open={requestedUser?.open} 
                footer={null}
                centered
                onCancel={() => {
                    setRequestedUser({
                        user: '',
                        open: false,
                        type: ''
                    })
                }}
                style={{
                    border: 'none !important'
                }}
            >
                    <div className="BoxModal">
                        
                        <div className="row">
                            <div className="col-12"
                                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', padding: '0px 116px' }}>
                                {requestedUser.type === 'reject' ? <span><CancelOutlinedIcon sx={{ fontSize: "83px ", fontWeight: 500, color: '#FF5630' }} /></span>
                                    :
                                    <span><CheckCircleOutlinedIcon sx={{ fontSize: "83px ", fontWeight: 500, color: '#39d139' }} /></span>
                                }
                                <Typography variant='h5' sx={{ fontSize: '24px', lineHeight: '40px', margin: '20px 0px 10px 0px' }}>Are you sure?</Typography>
                                <Typography variant='p' sx={{ fontSize: '16px', lineHeight: '24px', textAlign: 'center' }}>you want to {requestedUser.type} <strong> "{requestedUser?.user?.userId?.employeeName}"</strong> Request</Typography>
                            </div>
                        </div>
                        <div className="row mt-5" >
                            <div className="col-12">
                                <div className="fotter" style={{ float: 'right'}}>
                                    <Button variant="outlined" style={{borderRadius: '20px', marginRight: '10px'}}
                                    onClick={
                                        () => {
                                            setRequestedUser({
                                                user: '',
                                                open: false,
                                                type: ''
                                            })
                                        }  
                                    }
                                    >No</Button>
                                    <Button
                                    // type="danger"
                                    type="primary"
                                    danger={requestedUser.type === "reject" ? true : false}
                                    style={{ borderRadius: '20px'}}
                                    onClick={() => {
                                        if (requestedUser.type === "reject") {
                                            onCancelRequest(requestedUser.user)
                                        }
                                        else {
                                            onAcceptRequest(requestedUser.user)
                                        }
                                    }}
                                    >Yes</Button>
                                </div>
                            </div>
                        </div>
                    </div>
            </Modal>
            
        </>


    )
}
export default MyRequest