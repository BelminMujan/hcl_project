import React, { useState } from "react"
import Input from "../../Components/Input/Input"
import Button from "../../Components/Button/Button"
import { Link } from "react-router-dom"

const Login =()=>{
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] =useState()
    const [passwordConfirm, setPasswordConfirm] =useState()

    const handleLogin=()=>{
        
    }
    return <div className="login_wrapper">
        <Input label="E-Mail" value={email} onChange={setEmail}/>
        <Input label="Password" value={password} onChange={setPassword}/>
        <Button onClick={handleLogin}>Login</Button>
        <p>Don't have an account? <Link to="/register">Create one</Link></p>
    </div>
}

export default Login