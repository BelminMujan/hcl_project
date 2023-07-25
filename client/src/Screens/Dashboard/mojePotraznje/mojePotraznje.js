import React, { useEffect, useState } from "react";
import Api from "../../../Helpers/Api";
import { useSelector } from "react-redux";
import JobItem from "../../../Components/JobItem/JobItem";

const MojePotraznje = () => {
    const [jobs, setJobs] = useState()
    let api = new Api()
    let user = useSelector(state => state.user)
    useEffect(() => {
        api.get_jobs("my").then(data => {
            setJobs([...data])
        })
    }, [])
    return <div className="moje_potraznje_wrapper">
        {jobs && jobs.map(job => {
            return <JobItem {...job} />
        })}
    </div>
}

export default MojePotraznje