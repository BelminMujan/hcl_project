import React from "react";
import mapIcon from "../../Assets/Map.svg"
import hIcon from "../../Assets/h.svg"
import Button from "../Button/Button";
import Api from "../../Helpers/Api";


const UslugaItem = ({ title, description, hourlyRate, izbrisi, actions }) => {
    const handleDelete = () => {
        if (window.confirm("Da li sigurno zelite izbrisati uslugu?") === true) {
            izbrisi()
        }
    }
    return <div className="job_item usluga_item">
        <div className="image">U</div>
        <div className="details">
            <h3>{title}</h3>
            <p>{description}</p>

        </div>
        <div className="actions">
            {actions}
            {/* <p>{hourlyRate}</p>
            <Button onClick={handleDelete}>Izbrisi</Button> */}
        </div>

    </div>
}

export default UslugaItem