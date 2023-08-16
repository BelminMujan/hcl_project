import React, { useEffect, useState } from "react";
import Button from "../../../Components/Button/Button";
import NovaUsluga from "../../../Components/NovaUsluga/NovaUsluga"
import Api from "../../../Helpers/Api";
import JobItem from "../../../Components/JobItem/JobItem";
const MojePonude = () => { //Moje usluge
    const [usluge, setUsluge] = useState([])
    const [novaUsluga, setNovaUsluga] = useState(false)
    const closeModal = () => {
        setNovaUsluga(false)
    }
    const api = new Api()
    useEffect(() => {
        api.request("/usluga/load").then(res => {
            setUsluge(res)
        }).catch(e => {
            console.log(e)
        })
    }, [])
    return <div className="moje_ponude_wrapper">
        <div>
            <Button onClick={() => setNovaUsluga(true)}>Nova usluga</Button>
            {novaUsluga && <NovaUsluga close={closeModal} />}
            {usluge && usluge.map(u => {
                return <JobItem {...u} />
            })}
        </div>
    </div>
}

export default MojePonude