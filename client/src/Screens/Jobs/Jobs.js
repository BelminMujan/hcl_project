import React, { useEffect, useState } from "react";
import JobItem from "../../Components/JobItem/JobItem";
import Navbar from "../../Components/Navbar/Navbar";
import Filters from "../../Components/Filters/Filters";
import Footer from "../../Components/Footer/Footer";
import Api from "../../Helpers/Api";
import { useSelector } from "react-redux";
import Button from "../../Components/Button/Button";
import img1 from "../../Assets/ph_star-light.svg"
import img2 from "../../Assets/ph_star-fill.svg"
import { toast } from "react-hot-toast";
const Jobs = () => {
    const [jobs, setJobs] = useState()
    const [showAll, setShowAll] = useState(true)
    let api = new Api()
    let user = useSelector(state => state.user)
    if (!user || !Object.keys(user).length) {
        api.auto_login().then((res) => {
            console.log(res);
        })
    }

    useEffect(() => {
        api.request("/jobs").then(data => {
            setJobs([...data])
        })
    }, [])

    return <div className="jobs_wrapper">
        <Navbar />
        <div className="content">
            <Filters />
            <div className="job_list">
                {user && Object.keys(user).length > 0 && <div className="sve_preporuceno">
                    <div onClick={() => setShowAll(true)} className={`item ${showAll ? "active" : ""}`}>Sve</div>
                    <div onClick={() => setShowAll(false)} className={`item ${showAll ? "" : "active"}`}>Preporuceno</div>
                </div>}
                {jobs && jobs.map(job => {
                    return <JobItem {...job} actions={user && Object.keys(user).length > 0 ? <Actions2 {...job} /> : <Actions1 />} />
                })}
            </div>
        </div>
        <Footer />
    </div >

}

export default Jobs

const Actions1 = () => {
    return <div className="actions">
        <Button size={2}>Prijavi se za posao</Button>
    </div>
}

const Actions2 = (props) => {
    let api = new Api()
    const saveJob = () => {
        api.request("/jobs/save/" + props?.id).then(res => {
            console.log(res)
            toast.success("Posao uspjesno spasen")
        }).catch(e => {

        })
    }
    return <div className="actions">
        <Button size={2}>Detalji</Button>
        <img onClick={saveJob} className="save_action" src={props?.isSaved ? img2 : img1} />
    </div>
}