import React, { useEffect, useState } from "react";
import Api from "../../../Helpers/Api";
import PonudaItem from "../../../Components/PonudaItem/PonudaItem";

const PoslanePonude = () => {
    const api = new Api()
    const [offers, setOffers] = useState([])
    useEffect(() => {
        api.request("/offer/my").then(res => {
            console.log(res);
            setOffers(res)
        }).catch(e => {
            console.log(e)
        })
    }, [])
    return <div className="poslane_ponude_wrapper">
        <h4>Poslane ponude</h4>
        {offers && offers.map(offer => {
            return <PonudaItem {...offer} />
        })}
    </div>
}

export default PoslanePonude