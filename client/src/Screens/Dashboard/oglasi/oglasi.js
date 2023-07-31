import React, { useEffect, useState } from "react";
import Api from "../../../Helpers/Api";
import { useSelector } from "react-redux";
import JobItem from "../../../Components/JobItem/JobItem";
import Button from "../../../Components/Button/Button";
import Modal from "../../../Components/Modal/Modal";
import NoviOglas from "../../../Components/NoviOglas/NoviOglas";
import { toast } from "react-hot-toast";

const Oglasi = () => {
    const [jobs, setJobs] = useState()
    const [noviOglas, setNoviOglas] = useState(false)
    let api = new Api()
    let user = useSelector(state => state.user)
    useEffect(() => {
        api.request("/jobs/my", "GET").then(data => {
            setJobs([...data])
        })
    }, [])
    const closeModal = (success = false) => {
        if (success) {
            api.request("/jobs/my", "GET").then(data => {
                setJobs([...data])
            })
        }
        setNoviOglas(false)
    }
    const izbrisiOglas = (id) => {
        if (window.confirm("Jeste li sigurni da zelite izbrisati oglas?") === true) {
            api.request("/jobs/delete/" + id, "GET").then(res => {
                toast.success("Oglas uspjesno obrisan")
                console.log(res)
                api.request("/jobs/my", "GET").then(data => {
                    setJobs([...data])
                })
            }).catch(e => {
                toast.error("Error prilikom brisanja oglasa!")
                console.log(e)
            })
        }
    }
    return <div className="moje_potraznje_wrapper">
        <div>
            <Button onClick={() => setNoviOglas(true)}>Novi oglas</Button>
            {noviOglas && <NoviOglas close={closeModal} />}
        </div>
        {jobs && jobs.map(job => {
            return <JobItem key={job.id} {...job} actions={<Actions1 izbrisiOglas={() => izbrisiOglas(job.id)} />} />
        })}
    </div>
}

export default Oglasi

const Actions1 = (props) => {
    let api = new Api()

    return <div className="actions">
        <Button onClick={props.izbrisiOglas} size={2}>Izbrisi</Button>
        <Button size={2}>Detalji</Button>
    </div>
}