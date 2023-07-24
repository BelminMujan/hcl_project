import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import img1 from "../../Assets/image 2.png"
import img2 from "../../Assets/image 3.png"
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
const Landing = () => {
    const navigate = useNavigate()
    const handleButton = () => {
        return navigate("/login")
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
                <Button onClick={handleButton}>Prijavi se</Button>
            </div>
            <img src={img1} />
        </section>
        <section>
            <img src={img2} />
            <div>
                <h2>Potrebne su <br />ti usluge?</h2>
                <Button onClick={handleButton}>Prijavi se</Button>
            </div>
        </section>
    </div>
}

export default Landing