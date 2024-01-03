import '../../css/about.css'
import { Layout } from 'antd'
import theme from '../../css/theme.json'
import React from 'react'
import Navbar from '../Navbar'
import { FiTarget } from "react-icons/fi"
import { GiBullseye, GiSupersonicBullet } from "react-icons/gi"
const { Content } = Layout
function About() {
    return (
        <Layout>
            <Navbar />
            <Content style={{ backgroundColor: theme.colors.backgroundColor, minHeight: "95vh" }} >

                <div className='about-main-container'>
                    <div className='title-2'>Solar Electric Vehicle Championship (SEVC)</div>
                    <div className='about-description'>
                        Solar Electric Vehicle Championship (SEVC) is conducted by the collaboration of two societies, Hindustan
                        Innovative Product Development Society (HIPDS) and Society for Science, Technology, Management and
                        Humanities (SSTMH).
                    </div>
                </div>

                <div className='about-sub-container' >

                    <div className='img-about'>
                        <img src={require("../../assets/hidps.png")} />
                    </div>
                    <div className='container-abt-text'>
                        <div className='title'>HIPDS</div>
                        <div className='description'>Hindusthan Innovative Product Development Society (HIPDS) Hindusthan Innovative Product
                            Development Centre is a space for new age entrepreneurs and young minds to transform their innovative
                            ideas into viable business propositions. This Incubation Centre was approved by the Ministry of Small and
                            Medium Scale Enterprises (MSME), Govt. of India, New Delhi to implement the scheme of
                            “Entrepreneurial and Managerial Development of SMEs through Incubators”. Incubation Centre will
                            provide technological assistance to incubates which will be generated through mentors with
                            multidisciplinary expertise. HIPDC will be a startup hub offering infrastructure of co-working spaces and
                            full-spectrum business resources including hiring assistance, legal assistance and seed money.</div>
                    </div>
                </div>
                <div className='about-sub-container x2'>

                    <div className='container-abt-text'>
                        <div className='title'>SSTMH
                        </div>
                        <div className='description'>Society for Science, Technology, Management and Humanities (SSTMH) SSTMH is a National Level
                            society, registered under the Society's act from Govt. of Karnataka with an aim to nurture & develop
                            researchers, technocrats, Entrepreneurs and Business leaders globally to serve the needs of humanity.
                            Society further has the vision to be renowned internationally in Science, Technology, Management and
                            Humanity by serving the needs of Industry and Institutes through Educational Programs, Industry
                            interactions, Entrepreneurship development, innovation and incubation.</div>
                    </div>

                    <div className='img-about'>
                        <img src={require("../../assets/sstmh.png")} />

                    </div>
                </div>
                <div className="vision-container">
                    <div className='title-1'>
                        Our Mission <br />& Vision
                    </div>
                    <div className='container-mission'>
                        <div className='mission-container'>
                            <div className='mission-title'>Mission</div>
                            <div className='mission-description'>
                                <div> <GiSupersonicBullet /> Conduct events with innovative concepts satisfying society needs. Make them learn through
                                    practical approach. Create Opportunity for students to get placed in their desired fields.
                                </div>
                                <div>
                                    <GiSupersonicBullet /> To train and equip students with industrial level technical knowledge making them sound
                                    professionals enabling them to contribute to the development of our nation.
                                </div>
                            </div>
                        </div>
                        <div className='mission-container' >
                            <div className='mission-title'>Vision</div>
                            <div className='mission-description'>
                                <div><GiBullseye /> Educate, impart knowledge and create a multi-dimensional thinking for students to develop
                                    innovative concepts and make them excel in their domain.
                                </div>
                                <div>
                                    <GiBullseye /> To establish an eco-friendly means of transportation by the incorporation of future concept
                                    electric vehicles.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Content>
        </Layout>
    )
}

export default About
