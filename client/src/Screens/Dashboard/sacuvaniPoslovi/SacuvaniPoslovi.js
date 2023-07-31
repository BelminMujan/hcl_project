import React, { useEffect, useState } from "react";
import Api from "../../../Helpers/Api";
import JobItem from "../../../Components/JobItem/JobItem";
import Button from "../../../Components/Button/Button";
import { toast } from "react-hot-toast"
const SacuvaniPoslovi = () => {
    const api = new Api()
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        api.request("/jobs/saved").then(res => {
            console.log(res);
            setJobs(res)
        }).catch(e => {
            console.log(e)
        })
    }, [])
    const removeFromSaved = (id) => {
        if (window.confirm("Jeste li siguri da zelite izbrisati posao iz sacuvanih?") === true) {
            api.request("/jobs/remove_saved/" + id, "GET").then(res => {
                console.log(res);
                toast.success("Posao izbrisan uspjesno")
                api.request("/jobs/saved").then(res => {
                    console.log(res);
                    setJobs(res)
                }).catch(e => {
                    console.log(e)
                })
            }).catch(e => {
                console.log(e)
            })
        }
    }
    return <div className="sacuvani_poslovi_wrapper">
        <h4>Sacuvani poslovi</h4>
        <div className="job_list">
            {jobs && jobs.map(job => {
                return <JobItem key={job.id} {...job} actions={[<Actions1 removeFromSaved={() => removeFromSaved(job.id)} />, <Actions2 />]} />
            })}
        </div>
    </div>
}

export default SacuvaniPoslovi

const Actions1 = ({ removeFromSaved }) => {
    const api = new Api()

    return <div className="actions">
        <Button onClick={removeFromSaved} size={2}>Izbrisi</Button>
    </div>
}

const Actions2 = (props) => {
    return <div className="actions">
        <Button size={2}>Detalji</Button>
    </div>
}