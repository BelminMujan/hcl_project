import React from "react";
import { useSelector } from "react-redux";
import Input from "../../../Components/Input/Input";

const PodesavanjeProfila = () => {
    const user = useSelector(state => state.user)

    return <div className="podesavanje_profila_wrapper">
        <Input label="Ime" value={user.firstName} />
        <Input label="Prezime" value={user.lastName} />
        <Input label="Email" value={user.email} />
    </div>
}

export default PodesavanjeProfila