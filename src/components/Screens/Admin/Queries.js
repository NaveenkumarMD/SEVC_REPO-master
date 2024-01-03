import React, { useContext,useState,useEffect } from 'react'
import { BsFillEmojiSmileUpsideDownFill } from 'react-icons/bs'
import { Context } from '../../../App'
import Footer from '../../Footer'
import Navbar from '../../Navbar'

function Queries() {
    const [data, setData] = useState([])
    const {state,dispatch}=useContext(Context)
    useEffect(()=>{
        setData(state.admindata.contact)
    },[])
    return (
        <div>
            <Navbar/>
                <div className='queries'>
                    <div className='queries-container'>
                        <div className='title-1 queries-title'>Queries</div>
                        <div className='queries-table'>
                            {
                                data && data.map((item,index)=>{

                                    return(
                                        <div key={index} className='queries-card'>
                                            <div className='queries-teamname'>Team Name :{item.team_name}</div>
                                            <div className='queries-teamname'>Name :{item.name}</div>
                                            <div className='queries-message'>Message:{item.message}</div>
                                            <div className='queries-mobile'> Mobile:{item.mobile}</div>
                                            <div className='queries-email'>Email:{item.email}</div>
                                            <div className='queries-date'>Date:{item.created}</div>
                                        </div>
                                    )
                                })
                            }
                            </div>
                        </div>
                </div>
            <Footer/>
        </div>
    )
}

export default Queries
