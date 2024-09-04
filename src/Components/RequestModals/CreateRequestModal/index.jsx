import React from 'react'
import './styles.css'
import { Modal } from 'antd'
import RequestAddIcon from '../../../Assets/Icons/requestModalAddIcon.png'

const CreateRequestModal = ({createRequestModal, setCreateRequestModal, onCreateNewReq}) => {

  const Title = (
    <>
      <p>Create New Requests</p>
    </>
  )
  return (
    <>
        <Modal title={Title}
          centered 
          open={createRequestModal} 
          onCancel={()=>setCreateRequestModal(false)}
          footer={null}
          style={{borderRadius: '10px'}}
          width={'50%'}
        >
            <p>Choose a template</p>
            <div className='request_group'>
              <button className='request-type-button'
                onClick={()=>onCreateNewReq("wfh")}
              >
                <div className='request-icon'>
                  <img src={RequestAddIcon} alt="RequestAddIcon" />
                </div>
                <div className='request-type-description'>
                    <p className='request-main-desc'>Work From Home Request</p>
                    <label className='request-sec-desc'>Request for Work from home</label>
                </div>
              </button>
              <button className='request-type-button'
                onClick={()=>onCreateNewReq("leave")}
              >
                <div className='request-icon'>
                   <img src={RequestAddIcon} alt="RequestAddIcon" />
                </div>
                <div className='request-type-description'>
                    <p className='request-main-desc'>Leave Request</p>
                    <label className='request-sec-desc'>Request for Leave</label>
                </div>
              </button>
            </div>
            <div className='request_group mt-3'>
               <button className='request-type-button'
                  onClick={()=>onCreateNewReq("equipment")}
               >
                <div className='request-icon'>
                   <img src={RequestAddIcon} alt="RequestAddIcon" />
                </div>
                <div className='request-type-description'>
                    <p className='request-main-desc'>New Equipment Request</p>
                    <label className='request-sec-desc'>Request for New Equipment</label>
                </div>
              </button>
            </div>
        </Modal>

    </>
  )
}

export default CreateRequestModal