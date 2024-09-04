import React, { useEffect } from 'react'
import { DatePicker, Modal, Select,Input, Button } from 'antd'  
import RequestAddIcon from '../../../Assets/Icons/requestModalAddIcon.png'
import './styles.css'
import moment from 'moment'

const {Option} = Select;
const { TextArea } = Input;
const SendRequestModal = ({sendRequestModal, setSendRequestModal,
                NewRequestMade, setNewRequestMade,
                 onSendRequest, editReq,
                disableFields , isDisableReqButton , setIsDisabledReqButton ,
                descriptionCounter , setDescsriptionCounter
                }) => {

    const Title =(
        <>
            {(NewRequestMade.requestType === 'wfh')
                &&   <div className='modal-header-req'>
                        <img src={RequestAddIcon} alt="RequestAddIcon" />
                        <div>
                            <p className='modal-header-main'>Work From Home Request </p>
                            <p className='modal-header-sec'>Request for Work from Home</p>
                        </div>
                    </div>
            }
            {(NewRequestMade.requestType === 'leave')
                    &&   <div className='modal-header-req'>
                            <img src={RequestAddIcon} alt="RequestAddIcon" />
                            <div>
                                <p className='modal-header-main'>Leave Request </p>
                                <p className='modal-header-sec'>Request for Leave</p>
                            </div>
                        </div>
            }
             {(NewRequestMade.requestType === 'equipment')
                    &&   <div className='modal-header-req'>
                            <img src={RequestAddIcon} alt="RequestAddIcon" />
                            <div>
                                <p className='modal-header-main'>New Equipment Request</p>
                                <p className='modal-header-sec'>Request for new equipment</p>
                            </div>
                        </div>
            }
           
        </>
    )
    const dateFormat = 'YYYY/MM/DD';

    const handleLeaveChange =(value)=>{
        setNewRequestMade({
            ...NewRequestMade,
            leaveType: value,
        })
        
    }

    const onChangeStartDate =(date, formatedDate)=>{
         setNewRequestMade({
            ...NewRequestMade,
            startDate: formatedDate,
        })
    }
    const onChangeEndDate =(date, formatedDate)=>{
         setNewRequestMade({
            ...NewRequestMade,
            endDate: formatedDate,
        })
    }

    const onChangeDescription =(text)=>{
        const valid_text = text.target.value.trimStart()
        let current_text = text.target.value;
        if(current_text === valid_text){
            setNewRequestMade({
                ...NewRequestMade,
                description:  text.target.value,
            })
            let current_length = text.target.value.length ;
            setDescsriptionCounter(current_length)
            if (current_length > 9){
                setIsDisabledReqButton(false)
            }else{
                setIsDisabledReqButton(true)
            }
        }
    }
  return (
    <>
        <Modal title={Title} open={sendRequestModal} onCancel={()=>setSendRequestModal(false)}
            footer={null}
            centered
            width={'50%'}
        >
           {(NewRequestMade.requestType === 'leave') &&
                 <div className='modal-leave-type mb-3'>
                    <p className='modal-field-heading'>Leave Type</p>
                    <Select
                        value={NewRequestMade?.leaveType}
                        style={{
                            width: '100%',
                            borderRadius: '10px'
                        }}
                        onChange={handleLeaveChange}
                        disabled={disableFields}
                    >
                        <Option value="Sick">Sick Leave</Option>
                        <Option value="Casual">Casual Leave</Option>
                    </Select>
                </div>
           }
           <div className='modal-date-group row gx-2'>
                <div className='col-6'>
                    <p className='modal-field-heading'>Start Date</p>
                    <DatePicker 
                        // defaultValue={dayjs(NewRequestMade?.startDate, dateFormat)}
                        value={NewRequestMade?.startDate === "" ? "" : moment(NewRequestMade?.startDate, dateFormat)}
                        // value={NewRequestMade?.startDate === "" ? "" : dayjs(NewRequestMade?.startDate, dateFormat)}
                        onChange={onChangeStartDate} 
                        format={dateFormat} 
                        style={{ width: '100%', borderRadius: "10px" }}
                        disabled={disableFields}
                    />
                </div>
                <div className='col-6'>
                    <p className='modal-field-heading'>End Date</p>
                     <DatePicker 
                        onChange={onChangeEndDate} 
                        format={dateFormat} 
                        style={{ width: '100%', borderRadius: "10px" }}
                        value={NewRequestMade?.endDate === "" ? "" : moment(NewRequestMade?.endDate, dateFormat)}
                        disabled={disableFields}
                    />
                </div>
            </div> 
            <div className='req-description mt-3'>
                 <p className='modal-field-heading'>Description {" "}
                 { editReq ? NewRequestMade.description.length : descriptionCounter  } /50 </p>
                <TextArea
                    value={NewRequestMade?.description}
                    maxLength={50}
                    className="text-area-modal"
                    onChange={onChangeDescription}
                    disabled={disableFields}
                />
            </div>
           <div className='submit-modal mt-4'>
                  {disableFields ?
                    null
                    :
                    <Button
                        type='primary'
                        className='submit-modal-btn'
                        onClick={()=>{
                            editReq ? onSendRequest('edit') : onSendRequest('add')
                        }}
                        style={{
                            borderRadius: '20px',
                        }}
                        disabled = {isDisableReqButton}
                    >
                        {editReq
                            ? 'Edit Request'
                            : 'Send Request'
                        }
                    </Button>
                }
           </div>
           
        </Modal>
    </>
  )
}

export default SendRequestModal