import React from "react"
import Modal from "../Modal/Modal"
import Button from "../Button/Button"

const KontaktModal = ({ close, user }) => {
    return <Modal close={close}>
        <div >
            <h4>Kontakt</h4>
            <p>Ime i Prezime: {user?.firstName} {user?.lastName}</p>
            <p>Kontakt telefon: {user?.phone}</p>
            <p>Email: {user?.email}</p>
            <p>Grad: {user?.city}</p>
            <p>Adresa: {user?.address}</p>
            <div className="input_wrapper">
                <label>Posalji poruku</label>
                <textarea rows={8} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                <Button style={{ margin: "auto" }} size={2}>Posalji</Button>
            </div>
        </div>

    </Modal>
}

export default KontaktModal