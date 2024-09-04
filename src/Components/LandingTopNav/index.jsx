import React, { useState } from 'react'
import LogoMain from '../../Assets/images/LandingPage/DaftarPro.png'
import {Link} from 'react-scroll'
import { useNavigate } from 'react-router-dom'


const LandingTopNav= () => {
    const Navigate = useNavigate()
    const [active, setActive] = useState("home")
     //const [Nav,setNav] = useState()

    // const onScroll=()=>{
    //     if(window.scrollY>400){
    //         setNav({color:'white'})
    //     }


    // }
    // window.addEventListener('scroll',onScroll)


  return (
    <div className='landing-top-nav' >
        {/* LOGO */}
        <div className='logo-container'>
            <img src={LogoMain} alt="LogoMain" style={{width:'180px', height:'50px'}}/>
        </div>

        {/* NavLinks */}
        <nav className='nav-links' style={{marginRight: '-3%'}}>
            <Link 
                smooth spy to="home"
                duration={500} 
                className='nav-link-text'
                onClick={()=>{setActive('home')}} 
                // onScroll={()=>{setNav('home')}}
                activeClass={(active === "home") ? 'nav-link-text-active' : ''}
            >
                Home
            </Link>
            <Link 
                smooth spy to="features"

                
                duration={500} 
                className='nav-link-text' 
                 onClick={()=>{setActive('features')}} 
                //  onScroll={()=>{setNav('features')}}

                activeClass={(active === "features") ? 'nav-link-text-active' : ''}
            >
                Features
            </Link> 
            <Link 
             smooth spy to="testimonials"

                duration={500} 
                className='nav-link-text' 
                 onClick={()=>{setActive('testimonials')}} 
                activeClass={(active === "testimonials") ? 'nav-link-text-active' : ''}
            >
                Testimonials
            </Link> 
            <Link 
               smooth spy to="pricing"
 
                duration={500} 
                className='nav-link-text' 
                onClick={()=>{setActive('pricing')}} 
                activeClass={(active === "pricing") ? 'nav-link-text-active' : ''}
            >
                Pricing
            </Link>
            <Link 
             smooth spy to="faqs"
 
                duration={500} 
                className='nav-link-text' 
                onClick={()=>{setActive('faqs')}} 
                activeClass={(active === "faqs") ? 'nav-link-text-active' : ''}
            >
                FAQs
            </Link>       
        </nav>

        {/* Actions */}
        <div className='nav-actions'>
            {/* Signin Button*/}
            <button className='secondary-landing-button'
                onClick={()=>{
                    Navigate('/employlogin')
                }}
            >
                Sign In
            </button>
            <button className='primary-landing-button'
                 onClick={()=>{
                    Navigate('/registration')
                }}
            >
                Register
            </button>
            {/* Register Button*/}
        </div>
    </div>
  )
}

export default LandingTopNav;