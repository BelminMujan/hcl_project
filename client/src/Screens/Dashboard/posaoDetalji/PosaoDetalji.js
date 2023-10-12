import React, { useEffect, useState } from "react";
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
import KontaktModal from "../../../Components/KontaktModal/KontaktModal";
const PosaoDetalji = () => {
    const api = new Api()
    const [details, setDetails] = useState()
    const [showContact, setShowContact] = useState(false)
    const [showPonuda, setShowPonuda] = useState(false)
    const [offer_details, setOfferDetails] = useState("")
    const [requirements, setRequirements] = useState("")
    const [price_from, setPriceFrom] = useState("")
    const [price_to, setPriceTo] = useState("")
    const [alreadySent, setAlreadySent] = useState(false)
    const { id } = useParams();
    const user = useSelector(state => state.user)
    const saveJob = () => {
        api.request("/jobs/save/" + id).then(res => {
            console.log(res)
            setDetails(prev => ({ ...prev, isSaved: res.isSaved }))
            toast.success(res.message)
        }).catch(e => {
            toast.error("Vec spasen posao")

        })
    }
    const sendOffer = () => {
        let data = { offer_details, requirements, price_from, price_to, jobId: details.id }
        api.request("/offer/save", "POST", data).then(res => {
            console.log(res)
            setShowPonuda()
            toast.success(res.message)
            getDetails()
        }).catch(e => {
            toast.error(e?.error)

        })
    }
    useEffect(() => {
        getDetails()
    }, [])

    const handleStatusChange = (e, id) => {
        console.log(e.target.value)
        api.request(`/offer/change_status/${id}/${e.target.value}`).then(res => {
            toast.success(res?.success)
            getDetails()

        }).catch(e => {
            toast.error(e?.error)
            console.log(e)
        })
    }

    const getDetails = () => api.request("/jobs/details/" + id).then(data => {
        setDetails(data)
        console.log(data);
        data.jobOffers.forEach(jo => {
            if (jo.userId == user.id) {
                setAlreadySent(true)
            }
        })
    }).catch(e => {
        console.log(e)
    })

    return <div className="posao_detalji_wrapper">
        {showContact && <KontaktModal close={() => setShowContact(false)} user={showContact} />}
        {showPonuda && <Modal close={() => setShowPonuda(false)}>
            <div className="offer_modal">
                <h4>Posalji ponudu</h4>
                <Input label="Detalji ponude" type="text" value={offer_details} onChange={setOfferDetails} />
                <Input label="Uslovi" type="text" value={requirements} onChange={setRequirements} />
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <label>Cijena</label>
                    <Input type="number" min={0} value={price_from} onChange={setPriceFrom} />
                    <label>do</label>
                    <Input type="number" min={0} value={price_to} onChange={setPriceTo} />
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                    <Button onClick={sendOffer} style={{ margin: "auto" }} size={2}>Posalji</Button>
                </div>
            </div>

        </Modal>
        }
        <div>
            <div className="top">
                <h3>{details?.title}</h3>
                <img onClick={saveJob} className="save_action" src={details?.isSaved ? img2 : img1} />
            </div>
            <p>{details?.description}</p>
            <p>Kategorija: {details?.category?.name}</p>
            <p>Lokacija: {details?.city} {details?.address && `, ${details?.address}`}</p>
            <p>Trajanje posla: {details?.trajanje_od} {details?.trajanje_do && `do ${details?.trajanje_do}`}</p>
            <p>U terminu od {toDateString(details?.termin_od)} {details?.termin_do && `do ${toDateString(details?.termin_do)}`}</p>
            {details?.userId != user.id && < div className="options">
                {!alreadySent && <Button onClick={() => setShowPonuda(true)}>Posalji ponudu</Button>}
                <Button onClick={() => setShowContact(details?.user)}>Kontakt</Button>
            </div>}
            {details?.jobOffers && details?.jobOffers.length != 0 && details.jobOffers.map(offer => {
                if (offer.userId == user.id || details.userId == user.id) {
                    return <div key={offer.id}>
                        <h4>Detalji poslate ponude</h4>
                        <p>Detalji: {offer?.details}</p>
                        <p>Uslovi: {offer?.requirements}</p>
                        <p>Cijena od {offer?.price_from} do {offer?.price_to}</p>
                        <label>
                            Status:
                            <select onChange={(e) => handleStatusChange(e, offer?.id)} value={offer?.status}>
                                <option value={"sent"}>Sent</option>
                                <option value={"being_reviewed"}>Beeing reviewed</option>
                                <option value={"accepted"}>Accepted</option>
                                <option value={"in_progress"}>In progress</option>
                                <option value={"completed"}>Completed</option>
                            </select>
                        </label>
                        <p>
                            <Button onClick={() => setShowContact(offer?.user)}>Kontakt ponude</Button>
                        </p>
                    </div>
                }
            })}
        </div>

    </div >
}

export default PosaoDetalji