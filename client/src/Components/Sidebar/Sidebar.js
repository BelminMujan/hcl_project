import React from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { sidebar_urls } from "../../Helpers/constants";
import store from "../../Redux/store";

const Sidebar = () => {
    const navigate = useNavigate()
    const logout = () => {
        store.dispatch({ type: "logout" })
        localStorage.removeItem("token")
        navigate("/")
    }

    return <div className="sidebar_wrapper">

        {sidebar_urls.map(nav => {
            return <NavLink key={nav.path} className={"nav_link"} to={nav.path}>{nav.label}</NavLink>
        })}
        <div className="nav_link" onClick={logout}>Izloguj se</div>
    </div>
}

export default Sidebar