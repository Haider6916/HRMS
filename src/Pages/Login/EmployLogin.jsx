import React from "react";
import Login from "../../Components/Login/Login";
import Preview from "../../Assets/images/Side_View.png";

const EmployLogin = () => {
  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        <div
          className="col-4"
          style={{
            padding: '0px',
            background: "#0098C9",
          }}
        >
          <p style={{ position: "absolute", top: '37%', width: '17%', left: '9%', color: '#fff' }}>
            DaftarPro is a software applications that automate and streamline the HR functions of an organization
          </p>
          <img src={Preview}
          style={{
            height: "100vh",
            backgroundRepeat: "no-repeat",
            width: "100%",
            backgroundSize: "cover",
            margin: '0px',
            padding: '0px'
          }} />
        </div>
        <div className="col-8">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default EmployLogin;
