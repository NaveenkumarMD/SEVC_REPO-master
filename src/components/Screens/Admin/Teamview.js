import React, { useEffect, useState } from 'react'
import "../../../css/Admin/Teamview.css"
import Footer from '../../Footer'
import Navbar from '../../Navbar'
import { RiSecurePaymentFill } from "react-icons/ri"
import { json, useLocation } from 'react-router-dom'
import { db } from "../../../Firebase/init"
import { getDoc, query, where, collection, getDocs, updateDoc, doc, limit } from "firebase/firestore"
import { toast, ToastContainer } from 'react-toastify'
import sendmail from '../../../sendmails'
import { MdDone } from "react-icons/md"
import xlsx from "json-as-xlsx"
import { useParams } from 'react-router-dom';

function Teamview() {
    const location = useLocation()
    const {teamname} = useParams()
    const [teamdata, setTeamdata] = useState([])
    const fetchData = () => {
    
        const q = query(collection(db, "users"), where("team_name", "==", teamname))
        const querySnapshot = getDocs(q)
        let teams = []

        querySnapshot.then((querySnapshot) => {

            querySnapshot.forEach((doc) => {       
                setTeamdata(doc.data())

            })
        }).catch(err=>{
            console.log(err)
        })
        // if(true){
        //     let data=JSON.parse(localStorage.getItem("teams"))
        //     console.log(data)
        //     data.forEach(d=>{
        //         console.log("team:",d.team_name,teamname,d.team_name === teamname)
        //         if(d.team_name==teamname){
        //             console.log("set")
        //             setTeamdata(d)
        //         }
        //     })
        // }
    }
    useEffect(() => {
        fetchData()
    }, [])
    const handlepaymentauthorise = async () => {
        const q = query(collection(db, "users"), where("team_name", "==", teamname), limit(1))
        const querySnapshot = await getDocs(q)
        let docid = ""
        querySnapshot.forEach(async (docx) => {
            docid = docx.id
            await updateDoc(doc(db, "users", docid), {
                payment: true
            })
        })


    }
    const handlepaymentphase1 = () => {
        const q = query(collection(db, "users"), where("team_name", "==", teamname), limit(1))
        const querySnapshot = getDocs(q)
        let docid = ""
        querySnapshot.then((querySnapshot) => {
            querySnapshot.forEach((docx) => {
                docid = docx.id
                updateDoc(doc(db, "users", docid), {
                    phase1payment: true
                }, { merge: true })
            })
        })

        setTimeout(() => {
            toast.success("Payment authorized")
        }, 1000)
        setTimeout(() => {
            fetchData()
        }, 2000)
    }
    const handlepaymentphase2 = () => {
        const q = query(collection(db, "users"), where("team_name", "==", teamname), limit(1))
        const querySnapshot = getDocs(q)
        let docid = ""
        querySnapshot.then((querySnapshot) => {
            querySnapshot.forEach((docx) => {
                docid = docx.id
                updateDoc(doc(db, "users", docid), {
                    phase2payment: true

                }, { merge: true })
            })
        })
        setTimeout(() => {
            toast.success("Payment authorized")
        }, 1000)
        setTimeout(() => {
            fetchData()
        }, 2000)
    }
    const handlepaymentphase3 = () => {
        const q = query(collection(db, "users"), where("team_name", "==", teamname), limit(1))
        const querySnapshot = getDocs(q)
        let docid = ""
        querySnapshot.then((querySnapshot) => {
            querySnapshot.forEach((docx) => {
                docid = docx.id
                updateDoc(doc(db, "users", docid), {
                    phase3payment: true
                }, { merge: true })
            })
        })
        setTimeout(() => {
            toast.success("Payment authorized")
        }, 1000)
        setTimeout(() => {
            fetchData()
        }, 2000)
    }
    const dataItemToKeyValues = (item) => {
        if (!item) {
            return true
        }
        const entries = Object.entries(item);
        const listItems = entries.sort().map(([key, value]) => {
            if (value && typeof value ==="string" && value.includes("//")) {
                return <li style={{
                    color: "white", fontSize: "20px", fontWeight: 800, letterSpacing: 2,
                    fontFamily: `math`
                }}>{key}:<a style={{ color: "rgb(169 222 30)" }} target='_blank' href={value} rel="noreferrer"> view</a></li>
            }
            else if (typeof value === "boolean") {
                return <li style={{
                    color: "white", fontSize: "20px", fontWeight: 800, letterSpacing: 2,
                    fontFamily: `math`
                }}>{key}:<MdDone size={20} color="green" /></li>
            }
            else {
                return (
                    <li style={{
                        color: "white", fontSize: "20px", fontWeight: 800, letterSpacing: 2,
                        fontFamily: `math`
                    }}>

                        {key} : {value}
                    </li>
                )
            }

        });
        return listItems
    };

    const downloadTeamMembersData = () => {
        if (!teamdata) {
            return
        }
        let xldata = [
            {
                sheet: teamdata.team_name || "team details",
                columns: [
                    { label: "Name", value: "name" },
                    { label: "Phone", value: "phone_number" },
                    { label: "Email", value: "email" },
                    { label: "Department", value: "department" },
                    { label:"Year of Studt",value:"yos"}
                ],
                content: teamdata.memberDetails.memberDetails
            },
        ]
        let settings = {
            fileName: teamdata.team_name || "team details",
            extraLength: 3,
            writeMode: "writeFile",
            writeOptions: {},
        }

        xlsx(xldata, settings)
    }
    const reportView = (arr) => {
        if (!arr) {
            return
        }
        let map = arr.map(elem => {

            return <li style={{
                color: "white", fontSize: "20px", fontWeight: 800, letterSpacing: 2,
                fontFamily: `math`
            }}> <a style={{ color: "rgb(169 222 30)" }} target='_blank' href={elem} rel="noreferrer">View</a></li>
        })
        return map
    }
    return (
        <div>
            <Navbar />
            <ToastContainer />
            <div className='teamview'>

                <div className='home-container'>
                    
                    <div className='title-1 home-title'> {teamdata && teamdata.team_name}</div>
                    <div>
                        <ol>
                            <div className='title-1 home-title mt-4'>Phase 1 payment </div>
                            <div style={{ marginTop: "20px" }}>{dataItemToKeyValues(teamdata.phase1)}</div>
                            {
                                teamdata && teamdata.phase1 && (teamdata.phase1payment == false || !("phase1payment" in teamdata)) &&
                                <div>
                                    <div className='query-btn' onClick={handlepaymentphase1}>
                                        Authorize phase 1 <RiSecurePaymentFill size={25} />
                                    </div>
                                </div>
                            }
                            <div className='title-1 home-title mt-4'>Phase 2 payment </div>
                            <div style={{ marginTop: "30px" }}>{dataItemToKeyValues(teamdata.phase2)}</div>
                            {
                                teamdata && teamdata.phase2 && (teamdata.phase2payment == false || !("phase2payment" in teamdata)) &&
                                <div>
                                    <div className='query-btn' onClick={handlepaymentphase2}>
                                        Authorize phase 2 <RiSecurePaymentFill size={25} />
                                    </div>
                                </div>
                            }
                            <div className='title-1 home-title mt-4'>Phase 3 payment </div>
                            <div style={{ marginTop: "30px" }}>{dataItemToKeyValues(teamdata.phase3)}</div>
                            {
                                teamdata && teamdata.phase3 && (teamdata.phase3payment === false || !("phase3payment" in teamdata)) &&
                                <div>
                                    <div className='query-btn' onClick={handlepaymentphase3}>
                                        Authorize phase 3 <RiSecurePaymentFill size={25} />
                                    </div>
                                </div>
                            }
                            <div className='title-1 home-title mt-4'>Institute details </div>
                            <div style={{ marginTop: "30px" }}>{dataItemToKeyValues(teamdata?.teamDetails?.collegedata)}</div>
                            <div className='title-1 home-title mt-4'>Faculty  details </div>
                            <div style={{ marginTop: "30px" }}>{dataItemToKeyValues(teamdata?.teamDetails?.facultydata[0])}</div>
                            <div className='title-1 home-title mt-4'>Reports </div>
                            <div style={{ marginTop: "30px" }}>{reportView(teamdata.report1)}</div>
                            <div className='title-1 home-title mt-4'>Reports </div>
                            <div style={{ marginTop: "30px" }}>{reportView(teamdata.report2)}</div>
                        </ol>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                            <div className='login-btn' style={{ width: "auto" }} onClick={downloadTeamMembersData}>Download team members data</div>
                        </div>
                        <table className='table-view' >
                            {
                                <pre style={{ color: "white", fontSize: "20px", width: "1000px" }}>
                                    <code >
                                        {JSON.stringify(teamdata, null, 2).replace(/{/g, "").replace(/}/g, "").replace(/"/g, "").replace(/,/g, "").replace(/:/g, " : ")
                                        }
                                    </code>
                                </pre>
                            }
                            {/* {
                                teamdata && Object.keys(teamdata).map((item, index) => {
                                    if (item == "team_name" || item == "team_members" || item == "payment" ||
                                        item=="password"  || item=="confirm_password"
                                    ) {
                                        return true
                                    }
                                    return (
                                        <tr key={index}>
                                            <td className='field-label'>{item}</td>
                                            <td className='field-value'> :{teamdata[item]}</td>
                                        </tr>
                                    )
                                })
                            } */}

                        </table>
                        {/* {
                            teamdata && !teamdata.payment &&

                            <div>
                                <div className='query-btn' onClick={handlepaymentauthorise}>
                                    Authorize payment <RiSecurePaymentFill size={25} />
                                </div>
                            </div>
                        } */}



                        {
                            teamdata && teamdata.phase1 && teamdata.phase1payment &&
                            teamdata.phase2 && teamdata.phase2payment
                            && teamdata.phase2 && teamdata.phase3payment &&
                            <div className='title-1 download-title '>Candidated completed all the steps</div>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Teamview
