import React, { useState } from "react"
import Input from "../../Components/Input/Input"
import Button from "../../Components/Button/Button"
import { Link, useNavigate } from "react-router-dom"
import Api from "../../Helpers/Api"

const Register = () => {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const api = new Api()
    const navigate = useNavigate()
    const handleRegister = () => {
        api.register({ email, firstName, lastName, password, passwordConfirm }).then(res => {
            return navigate(res.goto)
        })
    }
    return <div className="register_wrapper">
        <Input name="email" label="E-Mail" value={email} onChange={setEmail} />
        <Input name="firstName" label="First Name" value={firstName} onChange={setFirstName} />
        <Input name="lastName" label="Last Name" value={lastName} onChange={setLastName} />
        <Input type="password" label="Password" value={password} onChange={setPassword} />
        <Input type="password" label="Confirm password" value={passwordConfirm} onChange={setPasswordConfirm} />
        <Button onClick={handleRegister}>Register</Button>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
}

export default Register