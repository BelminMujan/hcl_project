import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Input from "../../../Components/Input/Input";
import Api from "../../../Helpers/Api";
import { toast } from "react-hot-toast";
import Button from "../../../Components/Button/Button";

const PodesavanjeProfila = () => {
    const user = useSelector(state => state.user)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    useEffect(() => {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
    }, [user])
    const api = new Api()
    const save = () => {
        let data = { id: user.id, firstName, lastName, email }
        if (password || passwordConfirm) {
            if (password === passwordConfirm) {
                data.password = password
            } else {
                return toast.error("Sifre se ne poklapaju")
            }
        }
        api.request("/auth/update_profile", "POST", data).then(res => {
            console.log(res);
            toast.success("Uspjesno promjenjeni podaci")
        }).catch(e => {
            console.log(e);
            toast.error("Greska prilikom promjene podataka")
        })
    }
    return <div className="podesavanje_profila_wrapper">
        <Input label="Ime" value={firstName} onChange={(e) => setFirstName(e)} />
        <Input label="Prezime" value={lastName} onChange={(e) => setLastName(e)} />
        <Input label="Email" value={email} onChange={(e) => setEmail(e)} />
        <Input type="password" label="Sifra" value={password} onChange={(e) => setPassword(e)} />
        <Input type="password" label="Potvrdi sifru" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e)} />
        <Button onClick={save}>Sacuvaj promjene</Button>
    </div>
}

export default PodesavanjeProfila