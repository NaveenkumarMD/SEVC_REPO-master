import React, { useRef, useState, useContext } from 'react'
import Footer from '../Footer'
import Navbar from '../Navbar'
import '../../css/login.css'
import { useNavigate } from 'react-router-dom';
import { db } from "../../Firebase/init"
import { getDocs, doc, collection, where, query } from "firebase/firestore"
import { ToastContainer, toast } from "react-toastify"
import { Context } from '../../App';

function Login({ account }) {
    const { state, dispatch } = useContext(Context)
    const [passwordVisible, setPasswordVisible] = useState(false);
    const toastId = useRef(null)
    const [teamname, setTeamname] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handlelogin = async () => {
        if (!teamname || !password) {
            return toast.warning("provide teamname and password")
        }
        if (teamname.length < 2) {
            return toast.warning("teamname is too short")
        }
        if (teamname === "ADMIN" && password === "Almighty@SEVC24") {
            await getDocs(collection(db, "contact")).then((querySnapshot) => {
                let contact = []
                querySnapshot.forEach((doc) => {
                    contact.push(doc.data())
                })
                getDocs(collection(db, "users")).then((querySnapshot) => {
                    let teams = []
                    querySnapshot.forEach((doc) => {
                        teams.push(doc.data())
                    })
                    dispatch({
                        type: "ADMIN_LOGIN",
                        payload: {
                            contact: contact,
                            teams: teams
                        }
                    })
                    navigate("/admin")
                })
            })

        }
        toastId.current = toast("Logging in", {
            autoClose: false,
            closeOnClick: false,
        })
        try {
            const q = query(collection(db, "users"), where("team_name", "==", teamname))
            const querySnapshot = await getDocs(q)
            if (querySnapshot.empty) {
                toast.update(toastId.current, {
                    render: "teamname not found",
                    type: toast.TYPE.ERROR,
                    autoClose: 2000,
                    closeOnClick: true,
                })
                return
            }
            querySnapshot.forEach((doc) => {
                const event_type = doc.data()?.event_type;
                if (doc.data().password === password) {

                    if (((event_type === undefined && account == "SEVC") || event_type?.toLowerCase() === account.toLowerCase())) {
                        dispatch({
                            type: "LOGIN",
                            payload: doc.data()
                        })
                        toast.update(toastId.current, {
                            render: "Logged in",
                            type: toast.TYPE.SUCCESS,
                            autoClose: 2000,
                            closeOnClick: true,
                        })
                        setTimeout(() => {
                            navigate("/dashboard/")
                        }, 2000)
                    }
                    else {
                        toast.update(toastId.current, {
                            render: "You are at the wrong event page",
                            type: toast.TYPE.ERROR,
                            autoClose: 2000,
                            closeOnClick: true,
                        })
                    }

                }
                else {
                    toast.update(toastId.current, {
                        render: "Incorrect password",
                        type: toast.TYPE.ERROR,
                        autoClose: 2000,
                        closeOnClick: true,
                    })
                    return
                }
            })
        }
        catch (err) {
            console.log(err)
            alert("something went wrong")
        }

    }
    const handlekeypress = (e) => {
        if (e.key === "Enter") {
            handlelogin()
        }
    }
    return (
        <div onKeyDown={handlekeypress}>
            <Navbar />
            <ToastContainer />
            <div className='login'>
                <div className='login-form-container'>
                    <div className='title-1 login-title'>Login into {account}</div>
                    <div className='login-title-desc'>Pleasure to see you again</div>
                    <div>
                        <div className='input-container input-login'>
                            <label>Team Name</label><br />
                            <input value={teamname} onChange={(e) => setTeamname(e.target.value)} />
                        </div>
                        <div className='input-container input-login'>
                            <label>Password</label><br />

                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='submit-btn' onClick={handlelogin}>
                            <div className="login-btn">Login</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login
