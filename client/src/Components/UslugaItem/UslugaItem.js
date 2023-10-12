import React from "react";

const UslugaItem = ({ title, description, actions }) => {
    return <div className="job_item usluga_item">
        <div className="image">U</div>
        <div className="details">
            <h3>{title}</h3>
            <p>{description}</p>

        </div>
        <div className="actions">
            {actions}

        </div>

    </div>
}

export default UslugaItem