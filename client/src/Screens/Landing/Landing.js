import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import img1 from "../../Assets/image 2.png"
import img2 from "../../Assets/image 3.png"
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import JobItem from "../../Components/JobItem/JobItem";
import Footer from "../../Components/Footer/Footer";
import Api from "../../Helpers/Api";
import { useSelector } from "react-redux";
const Landing = () => {
    const navigate = useNavigate()

    const api = new Api()
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        api.request("/jobs?top=3").then(data => {
            console.log(data);
            setJobs([...data])
        })
    }, [])
    const handleButton = () => {
        return navigate("/login")
    }
    const loadMore = () => {
        return navigate("/jobs")
    }
    return <div className="landing_wrapper">
        <div className="header">
            <Navbar />
            <div className="logan">
                <h2>Radi sta zelis</h2>
                <h2>Radi kako zelis</h2>
                <div>
                    <h3>5000+</h3>
                    <p>Registrovanih korisnika</p>
                </div>
            </div>
        </div>
        <section>
            <div>
                <h2>Nudis neke <br />usluge?</h2>
                <Button size={2} onClick={handleButton}>Prijavi se</Button>
            </div>
            <img src={img1} />
        </section>
        <section>
            <img src={img2} />
            <div>
                <h2>Potrebne su <br />ti usluge?</h2>
                <Button size={2} onClick={handleButton}>Prijavi se</Button>
            </div>
        </section>
        <div className="job_list">
            {jobs && jobs.map(job => {
                return <JobItem {...job} actions={<Actions1 />} />
            })}
            {jobs && jobs.length != 0 && <Button onClick={loadMore} style={{ alignSelf: "center" }}>Ucitaj jos</Button>}

        </div>

        <Footer />
    </div>
}

export default Landing

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