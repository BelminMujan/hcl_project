import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Sidebar from "../../Components/Sidebar/Sidebar";

const Dashboard = () => {
    return <div className="dashboard_wrapper">
        <Navbar />
        <div className="content">
            <Sidebar />
            <div className="outlet" >
                <Outlet />
            </div>
        </div>
        <Footer />
    </div>
}
export default Dashboard