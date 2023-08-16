import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Api from "../../Helpers/Api";
import { toast } from "react-hot-toast";

const NovaUsluga = ({ close }) => {
    const [title, setTitle] = useState("")
    const [description, setDescriptiopn] = useState("")
    const [hourlyRate, setHourlyRate] = useState("")
    const [error, setError] = useState("")
    const api = new Api()
    const objavi = () => {
        api.request("/usluga/objavi", "POST", { title, description, hourlyRate }).then(res => {
            toast.success("Usluga uspjesno objavljena")
            close(true)
        }).catch(e => {
            console.log(e)
            setError(e.error)
        })
    }
    useEffect(() => {
        setError("")
    }, [title, description, hourlyRate])
    return <Modal close={close}>
        <div className="novi_oglas_modal">
            <h4>Nova usluga</h4>
            <Input label={"Naslov"} value={title} onChange={setTitle} />
            <Input label={"Opis"} value={description} onChange={setDescriptiopn} />
            <Input label={"Satnica"} value={hourlyRate} onChange={setHourlyRate} />

            {error && <p className="error-message">{error}</p>}
            <Button onClick={objavi}>Objavi</Button>
        </div>

    </Modal>
}


export default NovaUsluga