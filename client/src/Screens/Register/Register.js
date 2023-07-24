import React, { useState } from "react"
import Input from "../../Components/Input/Input"
import Button from "../../Components/Button/Button"
import { Link } from "react-router-dom"

const Register =()=>{
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] =useState()
    const [passwordConfirm, setPasswordConfirm] =useState()

    const handleRegister=()=>{
        
    }
    return <div className="register_wrapper">
        <Input label="E-Mail" value={email} onChange={setEmail}/>
        <Input label="Username" value={username} onChange={setUsername}/>
        <Input label="Password" value={password} onChange={setPassword}/>
        <Input label="Confirm password" value={passwordConfirm} onChange={setPasswordConfirm}/>
        <Button onClick={handleRegister}>Register</Button>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
}

export default Register