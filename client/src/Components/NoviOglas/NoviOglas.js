import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Api from "../../Helpers/Api";
import { toast } from "react-hot-toast";

const NoviOglas = ({ close }) => {
    const [title, setTitle] = useState("")
    const [description, setDescriptiopn] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [trajanje_od, setTrajanjeOd] = useState("")
    const [trajanje_do, setTrajanjeDo] = useState("")
    const [termin_od, setTerminOd] = useState(null)
    const [termin_do, setTerminDo] = useState(null)
    const [error, setError] = useState("")
    const api = new Api()
    const objavi = () => {
        api.request("/jobs/objavi", "POST", { title, description, city, address, trajanje_od, trajanje_do, termin_od, termin_do }).then(res => {
            toast.success("Oglas uspjesno objavljen")
            close(true)
        }).catch(e => {
            console.log(e)
            setError(e.error)
        })
    }
    useEffect(() => {
        setError("")
    }, [title, description, city, address, trajanje_do, trajanje_od, termin_od, termin_do])
    return <Modal close={close}>
        <div className="novi_oglas_modal">
            <h4>Novi Oglas</h4>
            <Input label={"Naslov"} value={title} onChange={setTitle} />
            <Input label={"Opis"} value={description} onChange={setDescriptiopn} />
            <Input label={"Grad"} value={city} onChange={setCity} />
            <Input label={"Adresa"} value={address} onChange={setAddress} />
            <div className="inline">
                <span>Trajanje od</span>
                <Input label={""} value={trajanje_od} onChange={setTrajanjeOd} />
                <span>do</span>
                <Input label={""} value={trajanje_do} onChange={setTrajanjeDo} />
                <span>{`(1s - 1 sat, 1d - 1 dan)`}</span>
            </div>
            <div className="inline">
                <label>Termin od</label>
                <Input type="datetime-local" label={""} value={termin_od} onChange={setTerminOd} />
                do
                <Input type="datetime-local" label={""} value={termin_do} onChange={setTerminDo} />
            </div>
            {error && <p className="error-message">{error}</p>}
            <Button onClick={objavi}>Objavi</Button>
        </div>

    </Modal>
}


export default NoviOglas