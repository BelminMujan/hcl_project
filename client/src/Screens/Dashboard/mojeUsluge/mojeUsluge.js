import React, { useEffect, useState } from "react";
import Button from "../../../Components/Button/Button";
import NovaUsluga from "../../../Components/NovaUsluga/NovaUsluga"
import Api from "../../../Helpers/Api";
import JobItem from "../../../Components/JobItem/JobItem";
import UslugaItem from "../../../Components/UslugaItem/UslugaItem";
const MojaUsluge = () => { //Moje usluge
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
    return <div className="moje_usluge_wrapper">
        <div>
            <Button onClick={() => setNovaUsluga(true)}>Nova usluga</Button>
        </div>

        {novaUsluga && <NovaUsluga close={closeModal} />}
        {usluge && usluge.map(u => {
            return <UslugaItem {...u} />
        })}
    </div>
}

export default MojaUsluge