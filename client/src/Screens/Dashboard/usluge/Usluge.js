import React, { useEffect, useState } from "react";
import JobItem from "../../../Components/JobItem/JobItem";
import Api from "../../../Helpers/Api";
import { useSelector } from "react-redux";
import Button from "../../../Components/Button/Button";
import img1 from "../../../Assets/ph_star-light.svg"
import img2 from "../../../Assets/ph_star-fill.svg"
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UslugaItem from "../../../Components/UslugaItem/UslugaItem";
import Modal from "../../../Components/Modal/Modal";
import KontaktModal from "../../../Components/KontaktModal/KontaktModal";
const Usluge = () => {
    const [usluge, setUsluge] = useState()
    const [showAll, setShowAll] = useState(true)
    let api = new Api()
    let user = useSelector(state => state.user)
    if (!user || !Object.keys(user).length) {
        api.auto_login().then((res) => {
            console.log(res);
        })
    }



    useEffect(() => {
        api.request("/usluga/load_all").then(data => {
            setUsluge([...data])
            console.log(data);
        }).catch(e => {
            console.log(e.error)
        })
    }, [])

    return <div className="poslovi_wrapper">
        <h3>Usluge</h3>
        {usluge && usluge.map(u => {
            return <UslugaItem {...u} actions={<Actions1 user={u?.user} />} />
        })}
    </div>
}

export default Usluge


const Actions1 = ({ user }) => {
    const [showContact, setShowContact] = useState(false)
    return <div className="actions">
        {showContact && <KontaktModal close={() => { setShowContact(false) }} user={user} />}
        <Button version={3} size={1} onClick={() => { setShowContact(true) }}>Kontakt</Button>
    </div>
}
