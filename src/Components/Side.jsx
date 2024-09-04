import React from 'react'
import Preview from "../Assets/images/Side_View.png";
// import Preview from "../../Assets/images/Side_View.png";

const Side = () => {
  return (
    <div
    className="col-4 bg-primary"
    style={{
     padding:'0px',
      background: "#0098C9",
    }}
  >
    <p style={{ position:"absolute",top:'37%',width:'17%',left:'9%',color:'#fff'}}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    <img
      src={Preview}
      style={{
        height: "100vh",
        backgroundRepeat: "no-repeat",
        width: "100%",
        backgroundSize: "cover",
        margin:'0px',
        padding:'0px'
      }}
    />

    <div>
      {/* <Typography variant='p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography> */}
    </div>
  </div>
  )
}

export default Side