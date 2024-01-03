import React from 'react'
import '../css/footer.css'
import {IoIosCall,IoIosMail} from "react-icons/io"
import {BsFacebook, BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs"
function Footer() { 
    return (
        <div className='footer'>
            <div className='contacts'>
                <a href="tel:+91 8148093826" className='mail-footer'><IoIosCall size={20}/> +91-8148093826</a>
                <a href='mailto:organiser@sevc.in' className='mail-footer'><IoIosMail size={20}/><div>organiser@sevc.in</div></a>
            </div>
            <div className='social-icons'>
                <div onClick={()=>window.open("https://www.linkedin.com/in/solar-electric-vehicle-championship/?originalSubdomain=in")}><BsLinkedin size={24} color='#252D2B'/>
                    <a  href='https://www.linkedin.com/in/solar-electric-vehicle-championship/?originalSubdomain=in'></a>
                </div>
                <div onClick={()=>window.open("https://www.instagram.com/sevc.official/")}><BsInstagram size={24} color='#252D2B'/></div>
                <div onClick={()=>window.open("https://twitter.com/sevc_india")}><BsTwitter size={24} color='#252D2B'/></div>
                <div onClick={()=>window.open("https://www.facebook.com/people/SEVC-Solar-Electric-Vehicle-Championship/100075857711118/")}><BsFacebook size={24} color='#252D2B'/></div>
            </div>
        </div>
    )
}

export default Footer
