export const initalstate = {
    userdata: localStorage.getItem("userdata") ? JSON.parse(localStorage.getItem("userdata")) : {},
    isloggedin: localStorage.getItem("isloggedin") ? localStorage.getItem("isloggedin") : false,
    isadmin: localStorage.getItem("isadmin") ?localStorage.getItem("isadmin") : false,
    admindata: {
        contact:localStorage.getItem("contact") ? JSON.parse(localStorage.getItem("contact")) : [],
        teams: localStorage.getItem("teams") ? JSON.parse(localStorage.getItem("teams")) : []
    }
}
export const mainreducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            let currstate= {
                ...state,
                userdata: action.payload,
                isloggedin: true
            }
            localStorage.setItem("userdata", JSON.stringify(currstate.userdata))
            localStorage.setItem("isloggedin", currstate.isloggedin)
            return currstate
        case "LOGOUT":
            localStorage.clear()
            return {
                ...state,
                userdata: {},
                isloggedin: false
            }
        case "ADMIN_LOGIN":
            let currstate1 = {
                ...state,
                admindata: action.payload,
                isadmin: true
            }
            localStorage.setItem("contact", JSON.stringify(currstate1.admindata.contact))
            localStorage.setItem("teams", JSON.stringify(currstate1.admindata.teams))
            localStorage.setItem("isadmin", currstate1.isadmin)
            return currstate1

        case "ADMIN_LOGOUT":
            localStorage.clear()
            return {
                ...state,
                isadmin: false,
                admindata: {
                    contact: [],
                    teams: []
                }
            }
        default:
            return state;
    }
}