import React from "react";
import Preview from "../../../Assets/images/Side_View.png";
import UserLog from "./userLogin";

const UserLogin = () => {
  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        <div
          className="col-4"
          style={{
            padding:'0px',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            background: "#0098C9",
          }}
        >
          <p style={{ position: "absolute", top: '37%', width: '15%', left: '9%', color: '#fff' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <img src={Preview} />
        </div>
        <div className="col-8">
            <UserLog/>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
