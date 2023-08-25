import React from "react";
import mapIcon from "../../Assets/Map.svg"
import hIcon from "../../Assets/h.svg"
import Button from "../Button/Button";
import { useSelector } from "react-redux";


const JobItem = ({ userId, title, description, duration, city, address, trajanje_od, trajanje_do, actions }) => {
    const user = useSelector(state => state.user)
    return <div className="job_item">
        <div className="image">{user.id == userId ? "M" : "J"}</div>
        <div className="details">
            <h3>{title}</h3>
            <p>{description}</p>
            <div>
                <p><img src={mapIcon} />{city}, {address}</p>
                {trajanje_od && <p><img src={hIcon} />{trajanje_od} {trajanje_do && `do ${trajanje_do}`}</p>}
            </div>
        </div>
        <div className="actions">
            {actions}
        </div>

    </div>
}

export default JobItem