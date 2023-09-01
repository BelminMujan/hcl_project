import React, { useEffect, useState } from "react";
import Api from "../../Helpers/Api";
import { toast } from "react-hot-toast";
import Input from "../Input/Input";

const Filters = ({ setFilters }) => {
    const api = new Api()
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const [lokacija, setLokacija] = useState("")
    const [trajanje_od, setTrajanjeOd] = useState("")
    const [trajanje_do, setTrajanjeDo] = useState("")
    const [termin_od, setTerminOd] = useState("")
    const [termin_do, setTerminDo] = useState("")
    const loadCategories = () => {
        api.request("/categories/load").then(data => {
            setCategories([...data])
        }).catch(e => {
            console.log(e?.error)
            toast.error(e?.error)
        })
    }

    useEffect(() => {
        loadCategories()
    }, [])
    useEffect(() => {
        let obj = {
            categoryId: category,
            city: lokacija,
            trajanje_od,
            trajanje_do,
            termin_od,
            termin_do
        }
        setFilters(obj)
        console.log(obj)
    }, [category, lokacija, trajanje_do, trajanje_od, termin_od, termin_do])
    return <div className="filters_wrapper">
        <label className="input_wrapper">
            Kategorija
            <select value={category} onChange={(e) => { setCategory(e.target.value) }}>
                <option value={""}>Sve</option>

                {categories && categories.map(c => {
                    return <option value={c?.id}>{c?.name}</option>
                })}
            </select>
        </label>
        <Input label="Lokacija" value={lokacija} onChange={setLokacija} />
        <label>
            Trajanje (sati)
            <div className="inline">
                <Input label="" value={trajanje_od} onChange={setTrajanjeOd} />
                do
                <Input label="" value={trajanje_do} onChange={setTrajanjeDo} />
            </div>
        </label>

        <Input label="Termin od" type="datetime-local" value={termin_od} onChange={setTerminOd} />
        <Input label="Termin do" type="datetime-local" value={termin_do} onChange={setTerminDo} />

    </div>
}
export default Filters