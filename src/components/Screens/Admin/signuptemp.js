import { Layout } from 'antd'
import React, { useState } from 'react'
import Navbar from '../Navbar'
import '../../css/contact.css'
import { FiArrowUpRight } from "react-icons/fi"
import Footer from '../Footer'
import { BsPlus } from 'react-icons/bs'
function Signup() {
    const [teammemberscount, setTeammemberscount] = useState(2)
    let a=0
    const addteammembers=()=>{
        if(teammemberscount>=5){
            return alert('Maximum 5 members allowed')
        }
        setTeammemberscount(teammemberscount+1)
    }
    return (
        <Layout>
            <Navbar />
            <div className='contact-main'>
                <div className='contact-container'>
                    <div className='contact-title'>Signup</div>
                    <div className='contact-form'>
                        <div className='input-container'>
                            <label>Name</label><br />
                            <input placeholder='Naveenkumar M' />
                        </div>
                        <div className='input-container'>
                            <label>E-mail</label><br />
                            <input placeholder='naveen9715568487@gmail.com' />
                        </div>
                        <div className='input-container'>
                            <label>Mobile</label><br />
                            <input placeholder='+91 8870499146' />
                        </div>
                        <div className='input-container'>
                            <label>Team Name (if registered)</label><br />
                            <input placeholder='thunderbird' />
                        </div>
                        {
                            [...Array(teammemberscount)].map((e, i) => {
                                a+=1
                                return (
                                    <>
                                        <div className='text3'>Team Member { a }</div>
                                        <div className='input-container'>
                                            <label>Name</label><br />
                                            <input placeholder='Naveenkumar M' />
                                        </div>
                                        <div className='input-container'>
                                            <label>E-mail</label><br />
                                            <input placeholder='naveen9715568487@gmail.com' />
                                        </div>
                                        <div className='input-container'>
                                            <label>Mobile</label><br />
                                            <input placeholder='+91 8870499146' />
                                        </div>
                                        <div className='input-container'>
                                            <label>Team Name (if registered)</label><br />
                                            <input placeholder='thunderbird' />
                                        </div>
                                    </>
                                )
                            }
                            )
                        }
{
                            teammemberscount<5&&
                            <div className='add-member-btn' onClick={addteammembers }>Add member +</div>
                            
}
                      
                    </div>
                    <div>
                        <div className='query-btn'>
                            Signup <FiArrowUpRight />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Layout>
    )
}

export default Signup
