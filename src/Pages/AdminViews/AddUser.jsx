import React from "react";
import { Tabs } from "antd";
import AddEmploy from "../../Components/Admincomponents/EmployAdd/AddEmploy";
import "../../Pages/AdminViews/Styles/AddEmployee.css";

const AddUser = () => {
  return (
    <div className="Box">
          <AddEmploy />
    </div>
  );
};

export default AddUser;
