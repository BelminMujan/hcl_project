import React, { useState } from "react";
import JobItem from "../../Components/JobItem/JobItem";
import Navbar from "../../Components/Navbar/Navbar";
import Filters from "../../Components/Filters/Filters";
import Footer from "../../Components/Footer/Footer";
import Api from "../../Helpers/Api";
import { useSelector } from "react-redux";

const Jobs = () => {
    const [jobs, setJobs] = useState(

    )
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
            <Filters />
            <div className="jobs_list">
                {jobs && jobs.map(job => {
                    return <JobItem {...job} />
                })}
            </div>
        </div>
        <Footer />
    </div>

}

export default Jobs