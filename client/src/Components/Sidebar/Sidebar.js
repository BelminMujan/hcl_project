import React from "react";
import logo from "../../Assets/JobSpot_no_shadow.svg"
import { NavLink } from "react-router-dom"
import Button from "../Button/Button";
import { sidebar_urls } from "../../Helpers/constants";

const Sidebar = () => {


    return <div className="sidebar_wrapper">
        {sidebar_urls.map(nav => {
            return <NavLink key={nav.path} className={"nav_link"} to={nav.path}>{nav.label}</NavLink>
        })}
    </div>
}

export default Sidebar