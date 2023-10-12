import React, { useEffect, useState } from "react";
import Button from "../../../Components/Button/Button";
import NovaUsluga from "../../../Components/NovaUsluga/NovaUsluga"
import Api from "../../../Helpers/Api";
import UslugaItem from "../../../Components/UslugaItem/UslugaItem";
import { toast } from "react-hot-toast";
const MojaUsluge = () => { //Moje usluge
    const [usluge, setUsluge] = useState([])
    const [novaUsluga, setNovaUsluga] = useState(false)
    const closeModal = () => {
        setNovaUsluga(false)
        loadUsluge()
    }
    const api = new Api()
    useEffect(() => {
        loadUsluge()
    }, [])

    const izbrisiUslugu = (id) => {
        api.request("/usluga/delete/" + id).then(res => {
            toast.success("Usluga uspjesno izbrisana!")
            loadUsluge()
        }).catch(e => {
            console.log(e)
            toast.error(e)
        })
    }

    const loadUsluge = () => {
        api.request("/usluga/load").then(res => {
            setUsluge(res)
        }).catch(e => {
            console.log("Greska :" + e.error);
            console.log(e)
        })
    }
    return <div className="moje_usluge_wrapper">
        <div>
            <Button onClick={() => setNovaUsluga(true)}>Nova usluga</Button>
        </div>

        {novaUsluga && <NovaUsluga close={closeModal} />}
        {usluge && usluge.map(u => {
            return <UslugaItem key={u.id} {...u} izbrisi={() => { izbrisiUslugu(u.id) }} actions={[<p>{u?.hourlyRate}</p>,
            <Button onClick={() => izbrisiUslugu(u.id)}>Izbrisi</Button>]} />
        })}
    </div>
}

export default MojaUsluge