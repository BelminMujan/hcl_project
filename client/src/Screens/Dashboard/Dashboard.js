import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useSelector } from "react-redux";

const Dashboard = () => {
    let token = localStorage.getItem("token")
    let user = useSelector(state => state.user)
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) {
            console.log("redirecting");
            navigate("/login")
        }
    }, [user])

    return <div className="dashboard_wrapper">
        <Navbar />
        {token && user && Object.keys(user).length != 0 && <div className="content">
            <Sidebar />
            <div className="outlet" >
                <Outlet />
            </div>
        </div>}
        <Footer />
    </div>
}
export default Dashboard