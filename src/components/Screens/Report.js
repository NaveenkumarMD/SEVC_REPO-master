import Layout, { Content } from 'antd/lib/layout/layout'
import React, { useState, useRef, useContext, useEffect } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import '../../css/report.css'
import { HiDocumentAdd } from "react-icons/hi"
import { BsFillFilePdfFill } from "react-icons/bs"
import { toast, ToastContainer } from 'react-toastify'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { db, storage } from '../../Firebase/init'
import { Context } from '../../App'
import { where, limit, doc, collection, getDoc, getDocs, query, updateDoc } from "firebase/firestore"
function Report() {
    const { state, dispatch } = useContext(Context)
    const [report1, setreport1] = useState()
    const [report2, setreport2] = useState()
    useEffect(() => {
        if (state.userdata.hasOwnProperty("report1")) {
            setreport1(state.userdata.report1)
        }
        if (state.userdata.hasOwnProperty("report2")) {
            setreport2(state.userdata.report2)
        }

    }, [state])
    return (
        <Layout>
            <ToastContainer />
            <Navbar />
            <Content >
                <div className='report'>
                    <div className='report-container'>
                        <div>
                            <div className='title-1 download-title '> VIRTUAL REPORT</div>
                            <div className='desc'>Submit the reports in .pdf format for the Virtual Presentation</div>
                            <div className='files-container'>
                                {
                                    report1?.map((report) => {
                                        return (
                                            <FileUploaded link={report} key={report} />
                                        )
                                    })
                                }

                                <FileAdd state={state} dispatch={dispatch} report="report1" />

                            </div>
                        </div>
                        <div>
                            <div className='title-1 download-title '> PHASE 2 REPORT</div>
                            <div className='desc'>Submit the reports for the second phase</div>
                            <div className='files-container'>
                                {
                                    report2?.map((report) => {
                                        return (
                                            <FileUploaded link={report} key={report} />
                                        )
                                    })
                                }

                                <FileAdd state={state} dispatch={dispatch} report="report2" />

                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ height: "200px" }}></div>
                    </div>
                </div>

            </Content>
            <Footer />
        </Layout>
    )
}

export default Report

const FileAdd = ({ state, dispatch, report }) => {
    const fileRef = useRef()
    const [file, setFile] = useState()
    const [url, setUrl] = useState()
    const [loading, setLoading] = useState(false)
    const handleChange = async (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0])
            try {
                toast.info("Upload started")
                let url = await handleUpload(e.target.files[0])
                const q = query(collection(db, "users"), where("team_name", "==", state.userdata.team_name), limit(1))
                const querySnapshot = await getDocs(q)
                let docid = ""
                if (querySnapshot.docs.length === 0) {
                    return toast.error('Contact SEVC team')
                }
                if (report === "report1") {
                    querySnapshot.forEach(async (docx) => {
                        docid = docx.id
                        docx = docx.data()
                        if (docx.hasOwnProperty("report1")) {
                            await updateDoc(doc(db, "users", docid), {
                                report1: [...docx.report1, url]
                            })
                        } else {
                            await updateDoc(doc(db, "users", docid), {
                                report1: [url]
                            })
                        }

                    }
                    )
                }
                else {
                    querySnapshot.forEach(async (docx) => {
                        docid = docx.id
                        docx = docx.data()
                        if (docx.hasOwnProperty("report2")) {
                            await updateDoc(doc(db, "users", docid), {
                                report2: [...docx.report2, url]
                            })
                        } else {
                            await updateDoc(doc(db, "users", docid), {
                                report2: [url]
                            })
                        }
                    }
                    )
                }

                const q1 = query(collection(db, "users"), where("team_name", "==", state.userdata.team_name), limit(1))
                const querySnapshot1 = await getDocs(q1)
                querySnapshot1.forEach(async (docx) => {
                    dispatch({
                        type: "LOGIN",
                        payload: docx.data()
                    })
                }
                )
                toast.success("Process completed")
            }
            catch (err) {
                toast.error(err)
            }
        }
    }
    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
    const handleUpload = (file) =>

        new Promise((resolve, reject) => {
            if (!file) {
                toast.error("Please select a file")
                reject("Please select a file")
            }
            setLoading(true)
            const storageref = ref(storage, `reports/${state.userdata.team_name}/${report}/${makeid(4)}`)
            const uploadtask = uploadBytesResumable(storageref, file)
            uploadtask.on('state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                }
                ,
                (error) => {
                    toast.error(error)
                    reject(error)
                    setLoading(false)
                }
                ,
                () => {
                    getDownloadURL(uploadtask.snapshot.ref).then((url) => {
                        toast.success("Uploaded")
                        setUrl(url)
                        resolve(url)
                        setLoading(true)
                    })
                }
            )
        })
    return (
        <div className='file-add-container' onClick={() => fileRef.current.click()}>
            <div>
                <HiDocumentAdd size={50} color='white' />
            </div>
            <div>Upload</div>
            <input ref={fileRef} onChange={handleChange} style={{ display: "none" }} type='file' />
        </div>
    )
}
const FileUploaded = ({ link }) => {
    return (
        <div className='file-add-container' onClick={() => window.open(link)}>
            <div>
                <BsFillFilePdfFill size={50} color='white' />
            </div>
            <div></div>
        </div>
    )
}