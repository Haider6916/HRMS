import React, { useState } from 'react'
import { Button, Tabs } from "antd";
import { Input, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "../../../Assets/Icons/deleteadm.png"
import deleteIcon from "../../../Assets/Icons/deleteadm.png"


const Adminpersmision = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: 'NAME',
      dataIndex: 'OverviewViewAccess',
      key: 'name',
    },

    {
      title: 'DESCRIPTION',
      dataIndex: 'Provides view access to the employee’s main dashboard',
      key: 'description'
    },
    {
      title: '',
      dataIndex: '',
      key: "action",
      render: (record) => {
        return (
          <>
            <Button className="btn_Color"

              onClick={() => {
                // editUser()
              }}
            // style={{ borderRadius: '50px', marginLeft: 'auto' }}
            >
              <img src={deleteIcon} />
            </Button>
          </>
        )
      }
    },
  ];


  const hasSelected = selectedRowKeys.length > 0;
  return (
    <>

      <div className='admin_permission'>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Profile Info" key="1">
            {/* <div className="Form1"> */}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Permissions" key="2" >
            <div className='row'>

              <div className='col-6 '>
                <Input className='searchbar' placeholder='Search for an Employee' />

              </div>
              <div className='col-6' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button className='btn'>+ADD PERMISSION</Button>
              </div>
            </div>

            <div className='row'>
              <div className='col-12 mt-3'>
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={columns}
                >


                </Table>

              </div>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>

  )
}

export default Adminpersmision