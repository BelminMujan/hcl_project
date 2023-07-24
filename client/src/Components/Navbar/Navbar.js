import React from "react";
import logo from "../../Assets/JobSpot_no_shadow.svg"
import { NavLink } from "react-router-dom"
import Button from "../Button/Button";

const Navbar = () => {

    const navs = [
        {
            label: "Home",
            to: ""
        },
        {
            label: "Community",
            to: ""
        },
        {
            label: "Find work",
            to: ""
        },
        {
            label: "Offer work",
            to: ""
        },
        {
            label: "About us",
            to: ""
        }
    ]
    return <div className="navbar_wrapper">
        <img src={logo} />
        <div>
            {navs.map(nav => {
                return <NavLink className={"nav_link"} to={nav.to}>{nav.label}</NavLink>
            })}
        </div>
        <div>
            <Button>Login</Button>
            <Button version={2}>Register</Button>
        </div>
    </div>
}

export default Navbar