import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Filters from "../../Components/Filters/Filters";
import Footer from "../../Components/Footer/Footer";
import Api from "../../Helpers/Api";
import { useSelector } from "react-redux";
import Poslovi from "../Dashboard/poslovi/Poslovi";
const Jobs = () => {
    const [filters, setFilters] = useState()
    const [showAll, setShowAll] = useState(true)
    let api = new Api()
    let user = useSelector(state => state.user)
    if (!user || !Object.keys(user).length) {
        api.auto_login().then((res) => {
            console.log(res);
        })
    }

    return <div className="jobs_wrapper">
        <Navbar />
        <div className="content">
            <Filters setFilters={setFilters} />
            <div className="job_list">
                {user && Object.keys(user).length > 0 && <div className="sve_preporuceno">
                    <div onClick={() => setShowAll(true)} className={`item ${showAll ? "active" : ""}`}>Sve</div>
                    <div onClick={() => setShowAll(false)} className={`item ${showAll ? "" : "active"}`}>Preporuceno</div>
                </div>}
                <Poslovi filters={filters} />
            </div>
        </div>
        <Footer />
    </div >

}

export default Jobs
