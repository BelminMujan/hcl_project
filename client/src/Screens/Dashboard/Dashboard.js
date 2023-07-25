import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import Api from "../../Helpers/Api";

const Dashboard = () => {
    let token = localStorage.getItem("token")
    const navigate = useNavigate()
    let api = new Api()
    let user = useSelector(state => state.user)
    useEffect(() => {
        if (!token) {
            return navigate("/login");
        }
        if (token) {
            console.log(user);
            if (!user || !Object.keys(user).length) {
                api.auto_login().then((res) => {
                    console.log(res);
                }).catch(e => {
                    localStorage.removeItem("token")
                    return navigate("/login");
                })
            }
        }
    }, [])


    return <div className="dashboard_wrapper">
        <Navbar />
        {token && user && <div className="content">
            <Sidebar />
            <div className="outlet" >
                <Outlet />
            </div>
        </div>}
        <Footer />
    </div>
}
export default Dashboard