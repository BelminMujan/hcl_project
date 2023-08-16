import React from "react";
import mapIcon from "../../Assets/Map.svg"
import hIcon from "../../Assets/h.svg"
import Button from "../Button/Button";


const UslugaItem = ({ title, description, hourlyRate }) => {
    return <div className="job_item usluga_item">
        <div className="image">U</div>
        <div className="details">
            <h3>{title}</h3>
            <p>{description}</p>

        </div>
        <div className="actions">
            <p>{hourlyRate}</p>
        </div>

    </div>
}

export default UslugaItem