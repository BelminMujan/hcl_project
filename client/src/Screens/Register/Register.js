import React, { useEffect, useState } from "react"
import Input from "../../Components/Input/Input"
import Button from "../../Components/Button/Button"
import { Link, useNavigate } from "react-router-dom"
import Api from "../../Helpers/Api"
import { toast } from "react-hot-toast"

const Register = () => {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [error, setError] = useState("")
    const api = new Api()
    const navigate = useNavigate()
    const handleRegister = () => {
        api.register({ email, firstName, lastName, password, passwordConfirm }).then(res => {
            console.log("registraicja uspjesna");
            toast.success("Registracija uspjesan")
            navigate("/dashboard/podesavanje_profila")
            navigate(0)
        }).catch(e => {
            setError(e.error)
        })
    }
    useEffect(() => {
        setError("")
    }, [email, firstName, lastName, password, passwordConfirm])
    return <div className="register_wrapper">
        <Input name="email" label="E-Mail" value={email} onChange={setEmail} />
        <Input name="firstName" label="First Name" value={firstName} onChange={setFirstName} />
        <Input name="lastName" label="Last Name" value={lastName} onChange={setLastName} />
        <Input type="password" label="Password" value={password} onChange={setPassword} />
        <Input type="password" label="Confirm password" value={passwordConfirm} onChange={setPasswordConfirm} />
        <Button onClick={handleRegister}>Register</Button>
        {error && <p className="error-message">{error}</p>}

        <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
}

export default Register