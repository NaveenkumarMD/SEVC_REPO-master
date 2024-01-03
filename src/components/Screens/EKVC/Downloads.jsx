import React, { useRef } from 'react'
import Footer from '../../Footer'
import Navbar from '../../Navbar'
import '../../../css/downloads.css'
import { HiDownload } from 'react-icons/hi'
import { useContext } from 'react'
import { Context } from '../../../App'
function EKVCDownloads() {
    const downloadref = useRef(null)
    const downloadref1 = useRef(null)
    const downloadref2 = useRef(null)
    const downloadref3 = useRef(null)
    const { state, dispatch } = useContext(Context)
    const event_type = state?.userdata?.event_type
    return (
        < >
            <Navbar />
            <div className='downloads'>
                <div className='download-container-1'>
                    <div className='title-1 download-title '> DOCUMENTS</div>

                    <div className='downloads-list'>
                        {
                            //only for logged in users
                            state.isloggedin &&
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>

                                <div className='download-container'>
                                    <div className='one'>
                                        <div className='image-cont'>
                                            <img src={require("../../../assets/document_icon.png")} alt='download' />
                                        </div>
                                        <div className='download-desc'>
                                            {/* <div className='download-titlex'>Rule book</div> */}
                                            <div className='download-descx'>
                                                SEVC-2024 EVENT RULE BOOK
                                                <a style={{ display: "none" }} ref={downloadref3} download href={require("../../../assets/Downloads/SEVC-2024_Rulebook.pdf")}>download</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='download-btn' onClick={() => downloadref3.current.click()} >
                                        <div>Download</div>
                                        <HiDownload />
                                    </div>

                                </div>

                                <div className='download-container'>
                                    <div className='one'>
                                        <div className='image-cont'>
                                            <img src={require("../../../assets/document_icon.png")} alt='download' />
                                        </div>
                                        <div className='download-desc'>
                                            {/* <div className='download-titlex'>Rule book</div> */}
                                            <div className='download-descx'>
                                                SEVC-2024 VIRTUAL ROUND GUIDELINES
                                                <a style={{ display: "none" }} ref={downloadref1} download href={require("../../../assets/Downloads/SEVC-2024_Virtual Round Guidelines Final.pdf")}>download</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='download-btn' onClick={() => downloadref1.current.click()} >
                                        <div>Download</div>
                                        <HiDownload />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className='download-container'>
                            <div className='one'>
                                <div className='image-cont'>
                                    <img src={require("../../../assets/document_icon.png")} alt='download' />
                                </div>
                                <div className='download-desc'>
                                    {/* <div className='download-titlex'>Rule book</div> */}
                                    <div className='download-descx'>
                                        SEVC-2024 REGISTRATION GUIDELINES
                                        <a style={{ display: "none" }} ref={downloadref} download href={require("../../../assets/Downloads/SEVC-2024_Registration Guidelines_Website.pdf")}>download</a>
                                    </div>
                                </div>
                            </div>
                            <div className='download-btn' onClick={() => downloadref.current.click()} >
                                <div>Download</div>
                                <HiDownload />
                            </div>
                        </div>


                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default EKVCDownloads
