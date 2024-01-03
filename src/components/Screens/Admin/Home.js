import React, { useContext, useState } from 'react'
import Footer from '../../Footer'
import Navbar from '../../Navbar'
import '../../../css/Admin/home.css'
import { useNavigate } from 'react-router-dom'
import { Context } from "../../../App"
import { useEffect } from 'react'
function Home() {
    const navigate = useNavigate()
    let a = 0, b = 0
    const { state, dispatch } = useContext(Context)
    const [teamsdata, setTeamsdata] = useState([])
    useEffect(() => {
        setTeamsdata(state.admindata.teams)
        console.log(state.admindata.teams)
    }, [])
    return (
        <div>
            <Navbar />
            <div className='home'>
                <div className='home-container'>
                    <div className='title-1 home-title'>SEVC Teams</div>
                    {
                        teamsdata && teamsdata.filter(teamData => teamData?.event_type === "sevc" || teamData.event_type === undefined).map((item, index) => {
                            a += 1
                            return (
                                <div key={index} className='team-card' onClick={() => navigate(`/admin/teamview/${item.team_name}`)}>
                                    <div className='team-name'>
                                        {a}.{item.team_name.slice(0, 1).toUpperCase() + item.team_name.slice(1)}
                                    </div>
                                    <div className='team-view'>View</div>
                                </div>
                            )
                        })
                    }
                    <div className='title-1 home-title'>EKVC Teams</div>
                    {
                        teamsdata && teamsdata.filter(teamData => teamData?.event_type === "ekvc").map((item, index) => {
                            b += 1
                            return (
                                <div key={index} className='team-card' onClick={() => navigate(`/admin/teamview/${item.team_name}`)}>
                                    <div className='team-name'>
                                        {b}.{item.team_name.slice(0, 1).toUpperCase() + item.team_name.slice(1)}
                                    </div>
                                    <div className='team-view'>View</div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Home
