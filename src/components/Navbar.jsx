import React, { useState, useEffect, useContext } from 'react'
import theme from '../css/theme.json'
import Logo from '../assets/Logo.png'
import { MdClose, MdMenu } from "react-icons/md"
import '../css/landing.css'
import { Menu, Layout, Button, Carousel } from "antd"
import { useNavigate, useLocation } from 'react-router-dom'
import { useRef } from 'react'
import { Context } from '../App'
import { FiLogOut } from 'react-icons/fi'
import { Menu as ReactMenu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import '../css/navbar.css'
const { Header, Content, Footer } = Layout

function Navbar() {
    const { state, dispatch } = useContext(Context)
    const navigate = useNavigate()
    const [userLoggedin, setUserLoggedin] = useState(false)
    const [adminLoggedin, setAdminLoggedin] = useState(false)
    const [screenInnerwidth, setScreeninnerwidth] = useState(window.innerWidth)
    useEffect(() => {
        window.addEventListener("resize", () => {
            setScreeninnerwidth(window.innerWidth)
        })
        if (state.isloggedin) {
            setUserLoggedin(true)
        }
        if (state.isadmin) {
            setAdminLoggedin(true)
        }
    }, [state.isloggedin, state.isadmin])
    const logout = () => {
        dispatch({ type: "LOGOUT" })
        dispatch({ type: "ADMIN_LOGOUT" })
        //refresh
        navigate("/")
        window.location.reload()

    }
    return screenInnerwidth > 900 ? <Mainnav logout={logout} adminLoggedin={adminLoggedin} userLoggedin={userLoggedin} /> : <MobileNav logout={logout} adminLoggedin={adminLoggedin} userLoggedin={userLoggedin} />

}
const Mainnav = ({ adminLoggedin, userLoggedin, logout }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [current, setCurrent] = useState("")
    useEffect(() => {
        if (location.pathname === "/") {
            setCurrent(location.pathname)
            return
        }
        setCurrent(location.pathname.replace("/", ""))

    }, []);
    return (

        <>
            <Header
                style={{
                    background: theme.colors.primaryGreen,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "60px",
                    overflowY: "visible",
                    padding: "0px !important",
                }}
            >
                <div className='nav-image1'>
                    <img src={Logo} alt="logo" style={{
                        zIndex: "900",

                    }} />
                </div>
                <Menu
                    inlineCollapsed={false}

                    style={{
                        background: theme.colors.primaryGreen,
                        display: "flex",
                        fontWeight: "500",
                        color: "black",
                        justifyContent: "center",
                        alignItems: "center",
                        fontFamily: "zian",
                        letterSpacing: "2px",
                        fontSize: "14px",
                        width: "750px"

                    }}
                    mode="horizontal"
                    defaultSelectedKeys={["home"]}
                    selectedKeys={[current]}
 
                >
                    <Menu.Item key="home" onClick={() => navigate("/")}>Home</Menu.Item>
                    <Menu.Item key="about" onClick={() => navigate("/about")}>About</Menu.Item>
                    <Menu.Item key="gallery" onClick={() => navigate("/gallery")}>Gallery</Menu.Item>
                    <Menu.Item key="rules" onClick={() => navigate("/rules")}>FAQ</Menu.Item>
                    <Menu.Item key="downloads" onClick={() => navigate("/downloads")}>Downloads</Menu.Item>
                    <Menu.Item key="contactus" onClick={() => navigate("/contactus")}>Contact us</Menu.Item>
                </Menu>
                {
                    adminLoggedin &&
                    <div style={{ display: "flex", gap: "20px", alignItems: "center", cursor: "pointer" }}>
                        <div style={{ fontWeight: 600, color: "black" }} onClick={() => navigate("/admin")}>Admin</div>
                        <div style={{ fontWeight: 600, color: "black" }} onClick={() => navigate("/admin/queries")}>Queries</div>
                        <FiLogOut onClick={() => logout()} />
                    </div>
                }
                {
                    userLoggedin &&
                    <div style={{ display: "flex", gap: "20px", alignItems: "center", cursor: "pointer" }}>
                        <div style={{ fontWeight: 600, color: "black" }} onClick={() => navigate("/reports")}>Reports</div>
                        <div style={{ fontWeight: 600, color: "black" }} onClick={() => navigate("/dashboard")}>Dashboard</div>
                        <FiLogOut style={{ cursor: "pointer" }} onClick={() => logout()} />
                    </div>

                }
                {
                    !userLoggedin && !adminLoggedin &&

                    <div>
                        <Button
                            onClick={() =>
                                navigate("/signup")
                            }
                            style={{
                                color: theme.colors.primaryGreen,
                                background: theme.colors.primaryBlack,
                                textAlign: "center",
                                display: "inline-block",
                                borderRadius: 0,
                                border: 0,
                            }}
                            className="signup-btn"
                        >
                            <span>Sign Up</span>
                        </Button>
                        <ReactMenu menuButton={<Button
                            style={{
                                color: theme.colors.primaryGreen,
                                background: theme.colors.primaryBlack,
                                textAlign: "center",
                                display: "inline-block",
                                borderRadius: 0,
                                border: 1,
                                borderLeft: "2px solid black"
                            }}
                            className="signup-btn"
                        >
                            <span>Log in</span>
                        </Button>}>
                            <MenuItem onClick={() => navigate("/SEVCLogin")}>SEVC</MenuItem>
                            <MenuItem onClick={() => navigate("/EKVCLogin")}>EKVC</MenuItem>
                        </ReactMenu>

                    </div>
                }
            </Header>
        </>
    )
}
const MobileNav = ({ userLoggedin, adminLoggedin, logout }) => {
    const [navopen, setNavopen] = useState(true)
    const sidenavref = useRef(null)
    const navigate = useNavigate()
    const [current, setCurrent] = useState("")
    const togglenav = () => {
        setNavopen(!navopen)
        if (navopen) {
            sidenavref.current.style.width = "80%"
        }
        else {
            sidenavref.current.style.width = "0px"
        }
    }
    return (
        <>
            <div className='mobilenav'>
                <div>
                    <img src={Logo} alt="logo" height={40} width={40} />
                </div>
                <div className='logo-word'>SEVC</div>
                <div className='menu-icon' onClick={togglenav}>
                    {
                        navopen ? <MdMenu /> : <MdClose />
                    }
                </div>

            </div>
            <div className='sidemenu' ref={sidenavref}>
                <div>
                    <Menu
                        style={{
                            background: theme.colors.primaryGreen,
                            display: "flex",
                            flexDirection: "column",
                            fontWeight: "500",
                            margin: "20px 10px",
                            color: "black",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            overflow: "hidden"

                        }}
                        mode="vertical"
                        defaultSelectedKeys={["home"]}
                        selectedKeys={[current]}
                    >
                        <Menu.Item key="home" onClick={() => {
                            togglenav()
                            navigate("/")
                        }}>Home</Menu.Item>
                        <Menu.Item key="about" onClick={() => {
                            togglenav()
                            navigate("/about")
                        }
                        } >About</Menu.Item>
                        <Menu.Item key="gallery" onClick={() => {
                            togglenav()
                            navigate("/gallery")
                        }
                        }>Gallery</Menu.Item>
                        <Menu.Item key="rules" onClick={() => {
                            togglenav()
                            navigate("/rules")
                        }}>FAQ</Menu.Item>
                        <Menu.Item key="downloads" onClick={() => {
                            togglenav()
                            navigate("/downloads")
                        }}>Downloads</Menu.Item>
                        <Menu.Item key="contactus" onClick={() => {
                            togglenav()
                            navigate("/contactus")
                        }
                        }>Contact us</Menu.Item>
                        {
                            userLoggedin &&
                            <>
                                <Menu.Item key="dashboard" onClick={() => {
                                    togglenav()
                                    navigate("/dashboard")
                                }
                                }>Dashboard</Menu.Item>
                                <Menu.Item key="report" onClick={() => {
                                    togglenav()
                                    navigate("/reports")
                                }
                                }>Reports</Menu.Item>
                                <Menu.Item onClick={logout}>Log out</Menu.Item>
                            </>
                        }
                        {
                            adminLoggedin &&
                            <>
                                <Menu.Item key="admin" onClick={() => {
                                    togglenav()
                                    navigate("/admin")
                                }}>Admin</Menu.Item>
                                <Menu.Item onClick={logout}>Log out</Menu.Item>

                            </>
                        }

                    </Menu>

                    {
                        !adminLoggedin && !userLoggedin &&

                        <div className='signup-login-btns' style={{ display: [!navopen ? "block" : "none"] }}>
                            <Button
                                onClick={() => navigate("/signup")}
                                style={{
                                    color: theme.colors.primaryGreen,
                                    background: theme.colors.primaryBlack,
                                    textAlign: "center",
                                    display: "inline-block",
                                    borderRadius: 0,
                                    border: 0,
                                }}
                                className="signup-btn"
                            >
                                <span>Sign Up</span>
                            </Button>
                            <br />
                            <br />
                            <Button
                                onClick={() => navigate("/SEVCLogin")}
                                style={{
                                    color: theme.colors.primaryGreen,
                                    background: theme.colors.primaryBlack,
                                    textAlign: "center",
                                    display: "inline-block",
                                    borderRadius: 0,
                                    border: 1,
                                    borderLeft: "2px solid black"
                                }}
                                className="signup-btn"
                            >
                                <span>SEVC Log in</span>
                            </Button>
                            <br />
                            <br />
                            <Button
                                onClick={() => navigate("/EKVCLogin")}
                                style={{
                                    color: theme.colors.primaryGreen,
                                    background: theme.colors.primaryBlack,
                                    textAlign: "center",
                                    display: "inline-block",
                                    borderRadius: 0,
                                    border: 1,
                                    borderLeft: "2px solid black"
                                }}
                                className="signup-btn"
                            >
                                <span>EKVC Log in</span>
                            </Button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar
