import React from "react";
import logo from "../../Assets/JobSpot_no_shadow.svg"
import { Link, NavLink } from "react-router-dom"
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import user_img from "../../Assets/account.png"

const Navbar = () => {

    const navs = [
        {
            label: "Home",
            to: "/"
        },
        {
            label: "Community",
            to: "/"
        },
        {
            label: "Find work",
            to: "/jobs"
        },
        {
            label: "Offer work",
            to: "/dashboard/oglasi"
        },
        {
            label: "About us",
            to: "/"
        }
    ]
    const user = useSelector(state => state.user)

    return <div className="navbar_wrapper">
        <Link to="/"><img alt="" src={logo} /></Link>
        {!window.location.pathname.includes("dashboard") && <div>
            {navs.map((nav, i) => {
                return <NavLink key={nav.to + i} className={"nav_link"} to={nav.to}>{nav.label}</NavLink>
            })}
        </div>}
        {user && Object.keys(user).length > 0 ? <Link to={"/dashboard/podesavanje_profila"}>
            <img alt="" src={user_img} />
        </Link> : <div>
            <Link to={"/login"}><Button>Login</Button></Link>
            <Link to={"/register"}><Button version={2}>Register</Button></Link>
        </div>}
    </div>
}

export default Navbar