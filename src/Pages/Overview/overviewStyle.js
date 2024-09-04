import styled from 'styled-components'
export const Section = styled.div`
background: #FFFFFF;
border-radius: 15px;
width: 100%;
min-height:419px;
height:auto;
margin-top: 81px;
padding:30px 30px 30px 30px;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);

/* For TAblet & Mobile Screen */

/* For laptop and deskop  */
@media only screen and (min-width: 1440px) {
    width: 100%;

    height: 461px;
    
  }
  @media only screen and (min-width: 768px) {
    width: 100%;

    height: 461px;
    
  }


`
export const Attendence = styled.aside`
width: 100%;
min-height:419px;
height:auto;
background: #FFF;
border-radius: 15px;
margin-top: 81px;
padding:30px 30px 30px 30px;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
@media only screen and (min-width: 1440px) {
    height: 461px;
    width: 100%;

  }
  @media only screen and (min-width: 768px) {
    height: 461px;
    width: 100%;

  }

`
export const RequestLeave = styled.div`
width: 100%;
min-height:419px;
height:auto;
background: #fff;
border-radius: 15px;
margin-top: 81px;
padding:30px 30px 30px 30px;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);

@media only screen and (min-width: 1440px) {
    height: 461px;
    width: 100%;

  }
  @media only screen and (min-width: 768px) {
    height: 461px;
    width: 100%;

  }

`
export const Activitylog  = styled.div`
width: 100%;
height: 200px;
min-height:419px;
height:auto;
margin-top: 10px;
background: #FFFFFF;
margin-bottom: 81px;
border-radius: 15px;
padding:30px 30px 30px 30px;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);
@media only screen and (min-width: 1440px) {
    height: 461px;
    
  }
@media only screen and (min-width: 768px) {
    height: 461px;
    
  }

`
export const CompanyPolicy=styled.div`
width: 100%;
min-height:419px;
height:auto;
margin-top: 10px;
background: #ffff;
margin-bottom: 81px;
border-radius: 15px;
padding:30px 30px 30px 30px;
box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15);

@media only screen and (min-width: 1440px) {
    height: 461px;
    
  }
  @media only screen and (min-width: 768px) {
    height: 461px;
    
  }



`
export const AlertCircle=styled.div `
width:27px;
height:27px;
background:linear-gradient(225deg, #E52D27 0%, #B31217 100%);
position:relative;
left:20px;
border-radius:50%;
text-align:center;
color:#fff;
font-weight:800;




`
export const PaperRequests=styled.button`
width:100%;
border:none;
text-align:left;
padding:31px 0px 29px 26.9px;
border-radius:10px;
margin-top:10px;
background:rgba(0, 152, 201,0.1);


`
export const Log=styled.div`
display: flex;
width: 100%;
height: 19px;
padding:22px 0px 22px 0px;
border-bottom:0.5px solid #0098C9;
@media only screen and (min-width: 768px) {
    height: 30%;
    
  }

`
export const Image = styled.div`
width: 75px;
height: 75px;
border-radius: 50%;
border:1px solid #000;




`