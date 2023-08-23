import React, { useEffect, useState } from "react";
import JobItem from "../../../Components/JobItem/JobItem";
import Api from "../../../Helpers/Api";
import { useSelector } from "react-redux";
import Button from "../../../Components/Button/Button";
import img1 from "../../../Assets/ph_star-light.svg"
import img2 from "../../../Assets/ph_star-fill.svg"
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { toDateString } from "../../../Helpers/helpers";
import Modal from "../../../Components/Modal/Modal";
import Input from "../../../Components/Input/Input";
const PosaoDetalji = () => {
    const api = new Api()
    const [details, setDetails] = useState()
    const [showContact, setShowContact] = useState(false)
    const { id } = useParams();
    const saveJob = () => {
        api.request("/jobs/save/" + id).then(res => {
            console.log(res)
            setDetails(prev => ({ ...prev, isSaved: res.isSaved }))
            toast.success(res.message)
        }).catch(e => {
            toast.error("Vec spasen posao")

        })
    }
    useEffect(() => {
        api.request("/jobs/details/" + id).then(data => {
            setDetails(data)
            console.log(data);
        }).catch(e => {
            console.log(e)
        })
    }, [])

    return <div className="posao_detalji_wrapper">
        {showContact && <Modal close={() => setShowContact(false)}>
            <div >
                <h4>Kontakt</h4>
                <p>Ime i Prezime: {details?.user?.firstName} {details?.user?.lastName}</p>
                <p>Kontakt telefon: {details?.user?.phone}</p>
                <p>Email: {details?.user?.email}</p>
                <p>Grad: {details?.user?.city}</p>
                <p>Adresa: {details?.user?.address}</p>
                <div className="input_wrapper">
                    <label>Posalji poruku</label>
                    <textarea rows={8} />
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                    <Button style={{ margin: "auto" }} size={2}>Posalji</Button>
                </div>
            </div>

        </Modal>}
        <div>
            <div className="top">
                <h3>{details?.title}</h3>
                <img onClick={saveJob} className="save_action" src={details?.isSaved ? img2 : img1} />
            </div>
            <p>{details?.description}</p>
            <p>Lokacija: {details?.city} {details?.address && `, ${details?.address}`}</p>
            <p>Trajanje posla: {details?.trajanje_od} {details?.trajanje_do && `do ${details?.trajanje_do}`}</p>
            <p>U terminu od {toDateString(details?.termin_od)} {details?.termin_do && `do ${toDateString(details?.termin_do)}`}</p>
            <div className="options">
                <Button>Posalji ponudu</Button>
                <Button onClick={() => setShowContact(true)}>Kontakt</Button>
            </div>
        </div>

    </div>
}

export default PosaoDetalji