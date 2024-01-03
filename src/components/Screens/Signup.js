import { Layout } from 'antd'
import React, { useRef, useState } from 'react'
import Navbar from '../Navbar'
import '../../css/contact.css'
import { FiArrowUpRight } from "react-icons/fi"
import Footer from '../Footer'
import { BsPlus } from 'react-icons/bs'
import { addDoc, collection, getDocs, doc, query, where } from "firebase/firestore"
import { db } from "../../Firebase/init"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'
function Signup() {
    const toastId = useRef(null)
    const navigate = useNavigate()
    const [teammemberscount, setTeammemberscount] = useState(2)
    const [data, setData] = useState({
        team_name: "",
        captain_name: "",
        team_email: "",
        captain_mobile: "",
        college_name: "",
        state: "",
        how: "",
        message: "",
        password: "",
        confirm_password: "",
        event_type: "sevc",
        payment: false
    })
    let a = 0
    const InputEvent = (event) => {
        const { name, value } = event.target
        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            }
        })
    }
    const handlesubmit = async () => {
        //validation
        if (data.team_name === "" || data.captain_name === "" || data.team_email === "" || data.captain_mobile === "" || data.college_name === "" || data.state === "" || data.how === "" || data.message === "") {
            toast.warning("please fill all the fields")
            return
        }
        //email validation
        if (!data.team_email.includes("@")) {
            toast.warning("please enter a valid email")
            return
        }
        if (data.password !== data.confirm_password) {
            toast.warning("passwords do not match")
            return
        }
        //mobile validation
        if (data.captain_mobile.length < 10) {
            toast.warning("please enter a valid mobile number")
            return
        }
        toastId.current = toast.info("Please wait while we are processing your request", {
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
        })
        try {
            //check if already registered
            const q = query(collection(db, "teams"), where("team_email", "==", data.team_email), where("team_name", "==", data.team_name))
            const querySnapshot = await getDocs(q)
            if (querySnapshot.size > 0) {
                toast.update(toastId.current, {
                    render: "You have already registered",
                    type: toast.TYPE.ERROR,
                    autoClose: 2000,
                    closeOnClick: true,
                })
                return
            }
            //add to database
            addDoc(collection(db, "users"), data)
            toast.update(toastId.current, {
                render: "Your team has been registered successfully",
                type: toast.TYPE.SUCCESS,
                autoClose: 2000,
                hideProgressBar: true,
            })
            setTimeout(() => {
                navigate(data.event_type === "sevc" ? "/SEVCLogin" : "/EKVCLogin")
            }, 2000)

        }
        catch (err) {
            toast.update(toastId.current, {
                render: "Something went wrong",
                type: toast.TYPE.ERROR,
                autoClose: 3000,
                hideProgressBar: true,
            })
        }
    }
    const handlekeypress = (e) => {
        if (e.key === "Enter") {
            handlesubmit()
        }
    }
    return (
        <Layout onKeyDown={handlekeypress}>
            <Navbar />
            <ToastContainer />
            <div className='contact-main'>
                <div className='contact-container'>
                    <div className='contact-title'>Sign up - Initial registration 2023</div>
                    <div className='contact-form'>
                        <div className="input-container event-select">
                            <label>Event</label>
                            <br />
                            <select
                                value={data.event_type}
                                name="event_type"
                                defaultValue="sevc"
                                onChange={InputEvent}
                            >
                                <option value="sevc">SEVC</option>
                                <option value="ekvc">EKVC</option>
                            </select>
                        </div>
                        <div className='input-container'>
                            <label>Team Name</label><br />
                            <input onChange={InputEvent} value={data.team_name} name="team_name" />
                        </div>
                        <div className='input-container'>
                            <label>Captain's Name</label><br />
                            <input onChange={InputEvent} value={data.captain_name} name="captain_name" />
                        </div>
                        <div className='input-container'>
                            <label>Captain's Mobile Number</label><br />
                            <input onChange={InputEvent} value={data.captain_mobile} name="captain_mobile" />
                        </div>
                        <div className='input-container'>
                            <label>Team Mail Id </label><br />
                            <input onChange={InputEvent} value={data.team_email} name="team_email" />
                        </div>
                        <div className='input-container'>
                            <label>College Name </label><br />
                            <input onChange={InputEvent} value={data.college_name} name="college_name" />
                        </div>
                        <div className='input-container'>
                            <label>State </label><br />
                            <input onChange={InputEvent} value={data.state} name="state" />
                        </div>


                        <div className='input-containerx'>
                            <label>How do you know about SEVC?</label><br />
                            <textarea onChange={InputEvent} value={data.how} name="how" ></textarea>
                        </div>
                        <div className='input-containerx'>
                            <label>Comments</label><br />
                            <textarea onChange={InputEvent} value={data.message} name="message" ></textarea>
                        </div>
                        <div className='input-container'>
                            <label>Password </label><br />
                            <input onChange={InputEvent} value={data.password} name="password" type="password" />
                        </div>
                        <div className='input-container'>
                            <label>Confirm password </label><br />
                            <input onChange={InputEvent} value={data.confirm_password} name="confirm_password" type="password" />
                        </div>
                    </div>
                    <div onClick={handlesubmit}>
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
