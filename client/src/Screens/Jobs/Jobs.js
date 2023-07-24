import React, { useState } from "react";
import JobItem from "../../Components/JobItem/JobItem";
import Navbar from "../../Components/Navbar/Navbar";
import Filters from "../../Components/Filters/Filters";
import Footer from "../../Components/Footer/Footer";

const Jobs = () => {
    const [jobs, setJobs] = useState([
        {
            title: "Potreban elektricar",
            description: "Potrebno postavljanje dodatnih uticnica",
            location: "Sarajevo, centar",
            duration: "2 do 3 sata"
        }, {
            title: "Potreban elektricar",
            description: "Potrebno postavljanje dodatnih uticnica",
            location: "Sarajevo, centar",
            duration: "2 do 3 sata"
        }, {
            title: "Potreban elektricar",
            description: "Potrebno postavljanje dodatnih uticnica",
            location: "Sarajevo, centar",
            duration: "2 do 3 sata"
        },
    ])
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