import React from "react";
import { Tabs } from "antd";
import AddEmploy from "../../Components/EmployAdd/AddEmploy";
import "../../Pages/HrViews/Styles/AddEmployee.css";

const AddUser = () => {
  return (
    <div className="Box">
      {/* <Typography variant='h4' sx={{color:'black'}}>HEllo</Typography> */}
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Profile Info" key="1">
          {/* <div className="Form1"> */}
          <AddEmploy />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Permissions" key="2" disabled>
          Content of Tab Pane 2
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default AddUser;
