import { Layout } from 'antd'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import '../../css/contact.css'
import { FiArrowUpRight } from "react-icons/fi"
import Footer from '../Footer'
import { addDoc, collection } from "firebase/firestore"
import firebase from 'firebase/app';
import 'firebase/firestore';
import { db } from '../../Firebase/init'
import { ToastContainer, toast } from "react-toastify"
import { useRef } from 'react'
function Contact() {
    const toastId = useRef(null)
    const [data, setData] = useState({
        name: "",
        email: "",
        message: "",
        team_name: "",
        mobile: "",
        created:new Date().toString()
    })
    const InputEvent = (event) => {
        const { name, value } = event.target
        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            }
        })
    }
    const handleenter = (event) => {
        if (event.key === "Enter") {
            handlesubmit()
        }
    }
    const handlesubmit = () => {
        //validation
        if (data.name === "" || data.email === "" || data.message === "" || data.mobile === "") {
            toast.warning("Fill all the fields")
            return
        }
        //email validation
        if (!data.email.includes("@")) {
            toast.warning("please enter a valid email")
            return
        }
        //mobile validation
        if (data.mobile.length < 10) {
            toast.warning("please enter a valid mobile number")
            return
        }
        toastId.current = toast.info("Please wait while we are processing your request", {
            autoClose: false,
            hideProgressBar: true,
        })

        try {
            addDoc(collection(db, "contact"), data)
            toast.update(toastId.current, {
                render: "Your request has been submitted successfully",
                type: toast.TYPE.SUCCESS,
                autoClose: 3000,
                hideProgressBar: true,
            })
            setData({
                name: "",
                email: "",
                message: "",
                team_name: "",
                mobile: "",
            })

        }
        catch (err) {
            console.log(err)
            toast.update(toastId.current, {
                render: "Something went wrong",
                type: toast.TYPE.ERROR,
                autoClose: 3000,
                hideProgressBar: true,
            })
        }
    }
    return (
        <Layout onKeyDown={handleenter}>
            <Navbar />
            <ToastContainer />
            <div className='contact-main'>
                <div className='contact-container'>
                    <div className='contact-title'>Get in touch with us</div>
                    <div className='contact-title'>Ask anything you want to listen from us 👋</div>
                    <div className='contact-form'>
                        <div className='input-container'>
                            <label>Name</label><br />
                            <input onChange={InputEvent} value={data.name} name="name" />
                        </div>
                        <div className='input-container'>
                            <label>E-mail</label><br />
                            <input onChange={InputEvent} value={data.email} name="email" />
                        </div>
                        <div className='input-container'>
                            <label>Mobile</label><br />
                            <input onChange={InputEvent} value={data.mobile} name="mobile" />
                        </div>
                        <div className='input-container'>
                            <label>Team Name (if registered)</label><br />
                            <input onChange={InputEvent} value={data.team_name} name="team_name" />
                        </div>
                        <div className='input-containerx'>
                            <label>Message</label><br />
                            <textarea onChange={InputEvent} value={data.message} name="message" placeholder='any questions....'></textarea>
                        </div>
                    </div>
                    <div onClick={handlesubmit}>
                        <div className='query-btn'>
                            Send <FiArrowUpRight />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Layout>
    )
}

export default Contact
