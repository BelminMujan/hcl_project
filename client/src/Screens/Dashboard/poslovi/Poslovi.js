import React, { useEffect, useState } from "react";
import JobItem from "../../../Components/JobItem/JobItem";
import Api from "../../../Helpers/Api";
import { useSelector } from "react-redux";
import Button from "../../../Components/Button/Button";
import img1 from "../../../Assets/ph_star-light.svg"
import img2 from "../../../Assets/ph_star-fill.svg"
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../../Components/Modal/Modal";
import Filters from "../../../Components/Filters/Filters";
const Poslovi = ({ filters = {} }) => {
    const [jobs, setJobs] = useState()
    const [showAll, setShowAll] = useState(true)
    const [filteriModal, setFilteriModal] = useState(false)
    const [localFilers, setLocalFilters] = useState(filters)
    let api = new Api()
    let user = useSelector(state => state.user)
    const location = useLocation()
    if (!user || !Object.keys(user).length) {
        api.auto_login().then((res) => {
            console.log(res);
        })
    }

    const updateSaved = (id, isSaved) => {
        setJobs(prev => prev.map(j => {
            let temp = j
            if (temp.id === id) {
                temp.isSaved = isSaved
            }
            return temp
        }))
    }

    useEffect(() => {
        let temp = Object.keys(filters).length ? filters : localFilers
        handleFiltering(temp)
    }, [localFilers, filters])

    const handleFiltering = (ff) => {
        api.request(`/jobs?${Object.entries(ff).map(([key, value]) => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        }).join("&")}`).then(data => {
            console.log(data)
            setJobs([...data])
        }).catch(e => {
            console.log(e)
        })
    }

    return <div className="poslovi_wrapper">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><h3>Poslovi</h3>
            {location?.pathname.includes("dashboard") && <Button onClick={() => setFilteriModal(true)}>Filteri</Button>}</div>

        {filteriModal && <Modal close={() => setFilteriModal(false)}>
            <Filters setFilters={setLocalFilters} />
        </Modal>}
        {jobs && jobs.map(job => {
            return <JobItem {...job} actions={user && Object.keys(user).length > 0 ? <Actions2 {...job} updateSaved={updateSaved} /> : <Actions1 />} />
        })}
    </div>
}

export default Poslovi


const Actions1 = () => {
    let isLogged = useSelector(state => state.user)
    const navigate = useNavigate()
    const handlePrijava = () => {
        if (isLogged && Object.keys(isLogged).length) {

        } else {
            navigate("/login")
        }
    }
    return <div className="actions">
        <Button size={2} onClick={handlePrijava}>Prijavi se za posao</Button>
    </div>
}

const Actions2 = (props) => {
    let api = new Api()
    const navigate = useNavigate()
    const saveJob = () => {
        api.request("/jobs/save/" + props?.id).then(res => {
            console.log(res)
            toast.success(res.message)
            props.updateSaved(props?.id, res.isSaved)
        }).catch(e => {
            toast.error("Vec spasen posao")

        })
    }
    return <div className="actions">
        <Button onClick={() => navigate(`/dashboard/posao/${props?.id}`)}>Detalji</Button>
        <img onClick={saveJob} className="save_action" src={props?.isSaved ? img2 : img1} />
    </div>
}