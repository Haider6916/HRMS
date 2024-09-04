import React,{ useState } from 'react'
import Slider from "react-slick";
import './styles.css'
import LandingTopNav from '../../Components/LandingTopNav'
import { Avatar, Button, Card, Collapse, Input, Rate } from 'antd'
import { Link, Element } from 'react-scroll';

import DashboardImage from '../../Assets/images/LandingPage/Dashboard_Img.png'
import superAdmin from '../../Assets/images/LandingPage/superAdmin.png'
import Finance from '../../Assets/images/LandingPage/Finance.png'
import CTO from '../../Assets/images/LandingPage/CTO.png'
import HR from '../../Assets/images/LandingPage/hr.png'
import marketing from '../../Assets/images/LandingPage/MARKETING.png'
import Employee from '../../Assets/images/LandingPage/employee.png'
import prevArrow from '../../Assets/images/LandingPage/prevArrow.png'
import nextArrow from '../../Assets/images/LandingPage/nextArrow.png'
import PlusIcon from '../../Assets/images/LandingPage/AddIcon.png'
import MinusIcon from '../../Assets/images/LandingPage/MinusIcon.png'
import nextWhiteArrow from '../../Assets/images/LandingPage/nextWhiteArrow.png'
import DaftarPro_footer from '../../Assets/images/LandingPage/DaftarPro_footer.png'
import gitLogo from '../../Assets/images/LandingPage/gitLogo.png'
import fbLogo from '../../Assets/images/LandingPage/fbLogo.png'
import linkedinLogo from '../../Assets/images/LandingPage/linkedin.png'
import './styles.css';
import { useNavigate } from 'react-router-dom';



const LandingPage = () => {
  const Navigate = useNavigate()
  const { Panel } = Collapse;

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 2,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
  
    const [clientReviews, setclientReviews] = useState([
      {
        key: '1',
        rating: 5,
        image: <img src={Employee} alt="Employee" />,
        review: 'Our HRMS has transformed the way we manage HR processes, making everything faster and more efficient. We highly recommend it.',
        name: "Muhammad Ahmed"
      },
      {
         key: '2',
          rating: 5,
        image: <img src={Employee} alt="Employee" />,
        review: 'The data security and privacy features of our HRMS are top-notch. We feel confident that our sensitive employee information is in good hands.',
        name: "Benjimen Henry"
      },
      {
         key: '3',
          rating: 5,
        image: <img src={Employee} alt="Employee" />,
        review: 'Our HRMS has transformed the way we manage HR processes, making everything faster and more efficient. We highly recommend it.',
        name: "Courtney Jack"
      },

    ])

    const [faqs, setFAQS] = useState([
      {
        key: 1,
        question: 'What is DaftarPro?',
        answer: 'DaftarPro is an all-in-one business management solution that streamlines HR operations, finance management, hiring, assets management and project management.'
      },
      {
        key: 2,
        question: 'How does DaftarPro help in HR operations?',
        answer: 'DaftarPro makes employee management a breeze. You can create, modify, enable, and disable employee records in just a few clicks. It also provides out of the box solutions for leaves, attendance, and shift management.'
      },
      {
        key: 3,
        question: 'Can DaftarPro help in managing finances?',
        answer: 'Yes, DaftarPro offers finance management solutions like payroll management, tax calculation, and a state-of-the-art finance dashboard to have a complete oversight on finance operations. '
      },
      {
        key: 4,
        question: 'What is the hiring process like in DaftarPro?',
        answer: 'The hiring process in DaftarPro is streamlined with the help of hiring pipelines. All stakeholders can be kept in the loop at every stage of the hiring process.'
      },
      {
        key: 5,
        question: 'How does DaftarPro help in assets management?',
        answer: 'DaftarPro keeps a real-time record of assignments and returns of company assets. This helps in keeping track of the assets and ensures accountability. '
      },

    ])


 function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
   <div
      className={className}
      style={{ ...style}}
      onClick={onClick}
    >
      <img src={nextArrow} alt="nextArrow"/>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style}}
      onClick={onClick}
    >
      <img src={prevArrow} alt="prevArrow"/>
    </div>
  );
}

  return (
    <div className='landing-page'>
       
       {/* TOP CONTAINER */}
          <div className='top-container'>
            {/* TOP NAV */}
            <LandingTopNav />
            <Element name="home" className='landing-header-text-container'>
                {/* Heading */}
                <p className='landing-heading'>Advanced HR Management <br /> System</p>
                {/* Description */}
                <p className='landing-description mt-5'>Simplifying management, optimizing performance.</p>
                <button 
                  onClick={() => {
                    Navigate('/registration')
                  }}
                  className='primary-landing-button mt-4 mb-2' style={{fontWeight: '400', width: '150px'}}>
                  Start Free Trail
                </button>
                
            </Element>
          </div>
          {/* Dashboard Image */}
            <div className='dashboard-image-container'>
              <img src={DashboardImage} alt="dashboardImage" style={{width: '85%'}}/>
            </div>
          {/* Discover Portion*/}
          <Element name="features" className='discover-container mt-5'>
            <p className='landing-primary-heading'>Discover The Possibilities</p>
            <label className='landing-label'>
              we combine  the best of both in a high fedality virtual environment.
            </label>
            <div className='landing-hrms-roles row mt-5'>
                    <div className='col-lg-4 row-md-6'>
                      <Card hoverable >
                        <img src={superAdmin} alt="superAdmin"/>
                        <p className='hrms-roles-name'>Employee Module</p>
                        <p className='hrms-roles-description'>An Employee
                          Empowering
                          System That Lets
                          Employees CheckIn, Check-Out,
                          Apply For Leaves
                          And Download View.
                        </p>
                      </Card>
                      <Card hoverable className='mt-5'>
                        <img src={Finance} alt="Finance"/>
                        <p className='hrms-roles-name'>Finance Management</p>
                        <p className='hrms-roles-description'>Generate Payrolls And Finances With Ease. Out-Of-The-Box Solutions For Tax Management,Oversight And Expense Management.</p>
                      </Card>
                    </div>
                    <div className='col-lg-4 row-md-6'>
                       <Card hoverable>
                        <img src={CTO} alt="CTO"/>
                        <p className='hrms-roles-name'>Assets Management</p>
                        <p className='hrms-roles-description'>Real-Time Record Of Assignments And Returns. Keep Track Of Company Assets With A Real-Time Record Of View.</p>
                      </Card>
                      <Card hoverable className='mt-5'>
                        <img src={marketing} alt="marketing"/>
                        <p className='hrms-roles-name'>Hiring</p>
                        <p className='hrms-roles-description'>Streamline The Hiring Process With Hiring Pipelines.Keep All Stakeholders In The Loop At Every Stage Of The Hiring Process.</p>
                      </Card>
                    </div>
                    <div className='col-lg-4 row-md-6'>
                      <Card hoverable>
                        <img src={HR} alt="HR"/>
                        <p className='hrms-roles-name'>HR Operations</p>
                        <p className='hrms-roles-description'>
                          Create, Modify,
                          Enable, And Disable
                          Employee Records
                          Easily. Easy Leave
                          And Attendance
                          Management And
                          Smooth Employee
                          Evaluation And
                          Appraisels.</p>
                      </Card>
                      <Card hoverable className='mt-5'>
                        <img src={Employee} alt="Employee"/>
                        <p className='hrms-roles-name'>Project Management</p>
                            <p className='hrms-roles-description'>Keep Track Of The
                              Organization's
                              Projects, Resources
                              Assigned, Costs,
                              And Planning.
                              Check The Status
                              And Progress Of View.</p>
                      </Card>
                    </div>
            </div>  
          </Element>

          {/* Our Customers */}
          <Element name="testimonials" className='our-customers-container mt-5'>
            <p className='landing-primary-heading'>Our customer's kind words</p>
            <label className='landing-label mb-5'>
              Know What They Are Saying About The Platform They Have Used.
            </label>
            {/* REACT-SLICK SLIDER */}
            <Slider {...settings}>
                {clientReviews?.map((review)=>(
                  <div key={review?.key}>
                    <Rate disabled value={review?.rating} />
                    <p className='review_desc'>{review?.review}</p>
                    <Avatar src={review?.image} />
                    <p className='review_name'>{review?.name}</p>
                  </div>
                ))}
            </Slider>
          </Element>

          {/* Pricing Table */}
          <Element name="pricing" className='pricing-container mt-5 pt-5'>
            <p className='landing-primary-heading pt-5'>Pricing Table</p>
            <label className='landing-label mt-3'>
              Home is behind, the world ahead and there are many paths to <br /> tread through shadows to the edge.
            </label>
            <div className='pricing-cards row mt-3'>
                {/* Free */}
                <div className='pricing-card-secondary col-4'>
                  <p className='pricing-card-title'> Basic Plan </p>
                  <p className="pricing-card-package"> $5.00 / mo</p>
                  <p className="pricing-timeline">Forever</p>
                  <hr className="hrLine" />
                  <ul className='pricing-list'>
                    <li>Upto 25 Users</li>
                     <li>HR management </li>
                      <li>Finance Management</li>
                       <li>Email Support</li>
                  </ul>
                  <button className='secondary-landing-button'>Choose Basic</button>
                </div>
                {/* Professional Plan */}
                <div className='pricing-card-primary col-4'>
                  <p className='pricing-card-title' style={{ color: '#FFFFFF' }}> Premium Plan </p>
                    <p className="pricing-card-package" style={{color: '#FFFFFF'}}> $9.95 / mo</p>
                    <p className="pricing-timeline" style={{color: '#FFFFFF'}}>Billed annually or $12 <br /> Month-To-Month</p>
                  <hr className="hrLine-primary" />
                    <ul className='pricing-list' style={{color: '#FFFFFF'}}>
                      <li>Upto 50 Users</li>
                      <li>All Features of Basic Plan</li>
                      <li>Hiring and Assets management</li>
                      <li>Priority Email Support</li>
                    </ul>
                    <button className='primary-landing-button'>Choose Premium</button>
                </div>
                {/* Organizationtal Plan */}
                <div className='pricing-card-secondary col-4'>
                  <p className='pricing-card-title'> Enterprise Plan </p>
                    <p className="pricing-card-package"> $30.95 / mo</p>
                    <p className="pricing-timeline">Annual billing only</p>
                  <hr className="hrLine" />
                    <ul className='pricing-list'>
                      <li>Upto 100 users </li>
                      <li>All Features of Premium Plan </li>
                      <li>Project management</li>
                      <li>Live Chat Support</li>
                    </ul>
                    <button className='secondary-landing-button'>Choose Enterprise</button>
                </div>
            </div>

          </Element>

          {/* FAQS */}
          <Element  name="faqs" className='faqs-container mt-5'>
            <p className='landing-primary-heading'>Frequent Ask Questions</p>
            <label className='landing-label mt-3'>
              Our most frequently asked questions
            </label>
            <div className='faqs-list'>
                  {faqs.map((item)=>(
                    <Collapse key={item.key} defaultActiveKey={["1"]} 
                      // onChange={onChange}
                      expandIcon={({ isActive }) => isActive ? <img src={MinusIcon} alt="MinusIcon"/>  : <img src={PlusIcon} alt="PlusIcon"/>}
                    >
                      <Panel header={item.question} key={item.key}>
                        <p className='faqs-answers'>
                          {item.answer}
                        </p>
                      </Panel>
                    </Collapse>
                  ))}
            </div>
            
          </Element>

          {/* WHATS GOING ON */}
          <div className='whats-going-on flex-center'>
            <div className='whats-going-container'>
              <p className='whats-going-container-heading'>HR Management system</p>
              <p className='whats-going-container-description'>easily manage your employee keep track of what’s <br /> going on everywhere</p>
              {/* whats going on actions */}
              <div className='whats-going-on-actions'>
                    <button className='primary-landing-button' >Get Started free</button>
                    <button className='secondary-landing-button'>Login</button>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="landing-footer">
              <div className="footer-top row">
                    {/* features */}
                    <div className="features-footer col-lg-2 col-md-12" style={{display:'flex', flexDirection: 'column'}}>
                      <p className='footer-top-heading '>Features</p>
                      <Link className='secondary-text-color'>Super Admin</Link>
                      <Link className='secondary-text-color'>CTO</Link>
                      <Link className='secondary-text-color'>HR Manager</Link>
                      <Link className='secondary-text-color'>Marketing</Link>
                       <Link className='secondary-text-color'>Employee</Link>
                    </div>
                    {/* Information */}
                    <div className="information-footer col-lg-2 col-md-12" style={{display:'flex', flexDirection: 'column'}}>
                      <p className='footer-top-heading'>Information</p>
                      <Link className='secondary-text-color'>Testimonials</Link>
                      <Link className='secondary-text-color'>Pricing</Link>
                      <Link className='secondary-text-color'>FAQs</Link>
                    </div>
                    {/* Company */}
                    <div className='company-footer col-lg-2 col-md-12' style={{display:'flex', flexDirection: 'column'}}>
                       <p className='footer-top-heading'>Company</p>
                      <Link className='secondary-text-color'>Testimonials</Link>
                      <Link className='secondary-text-color'>Pricing</Link>
                      <Link className='secondary-text-color'>FAQs</Link>
                    </div>
                    {/* Subscribe */}
                    <div className='subscribe-footer col-3 ' style={{display:'flex', flexDirection: 'column'}}>
                      <p className='footer-top-heading'>Subscribe</p>
                      <div style={{padding: '0px 10px'}}>
                        <Input.Group compact>
                          <Input style={{ width: 'calc(100% - 50px)' }} placeholder="Email address" />
                          <Button type="primary" style={{backgroundColor: '#0098C9', borderRadius: '0px 6px 6px 0px'}}><img src={nextWhiteArrow} alt='nextWhiteArrow' /></Button>
                        </Input.Group>
                        <p className='subscribe-description secondary-text-color'>
                          Insert email here to get the subscription.
                        </p>
                      </div>
                      
                    </div>
                    <hr className='line-footer' />
                    
              </div>
              <div className="footer-bottom row">
                  {/* HRMS */}
                  <div className="hrms-footer col-lg-4 col-sm-6">
                    <img src={DaftarPro_footer} alt='' style={{width:'180px', height:'50px'}}/>
                  </div>
                  {/* TERMS */}
                 <div className="terms-footer flex-center col-lg-4 col-sm-6" style={{gap: '15px', justifyContent: 'center'}}>
                    <p> Terms </p>
                    <p>Privacy</p>
                    <p>Cookies</p>
                  </div>
                  {/* socials */}
                  <div className="social-links-footer flex-center col-lg-4 col-sm-6" style={{ gap: '15px', marginRight: '-14px', justifyContent: 'flex-end' }}>
                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" >
                      <img src={linkedinLogo} alt="linkedinLogo"/>
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" >
                      <img src={fbLogo} alt="fbLogo"/>
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" >
                      <img src={gitLogo} alt="gitLogo"/>
                    </a>
                  </div>
              </div>      
          </div>
          
    </div>
  )
}

export default LandingPage