import React from "react";
import mapIcon from "../../Assets/Map.svg"
import hIcon from "../../Assets/h.svg"
import Button from "../Button/Button";


const PonudaItem = ({ details, jobId, createdAt, price_from, price_to, requirements, status }) => {
    return <div className="ponuda_item">
        <div>
            <div>Detalji: {details}</div>
            <div>Uslovi: {requirements}</div>
        </div>
        <div className="right">
            {price_from && <div>Cijena od {price_from}KM {price_to && ` do ${price_to}KM`}</div>}

            <div className="status">
                {status}
            </div>
        </div>

    </div>
}

export default PonudaItem