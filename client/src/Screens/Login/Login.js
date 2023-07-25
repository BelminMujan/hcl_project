import React, { useEffect, useState } from "react"
import Input from "../../Components/Input/Input"
import Button from "../../Components/Button/Button"
import { Link, useNavigate } from "react-router-dom"
import Api from "../../Helpers/Api"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState()
    const navigate = useNavigate()
    const api = new Api()

    useEffect(() => {
        setError()
    }, [email, password])

    const handleLogin = () => {
        api.login({ email, password }).then(res => {
            return navigate(res.goto)
        }).catch(e => {
            if (e.error) {
                setError(e.error)
            }
        })
    }
    return <div className="login_wrapper">
        <Input name="email" label="E-Mail" value={email} onChange={setEmail} />
        <Input type="password" label="Password" value={password} onChange={setPassword} />
        <Button onClick={handleLogin}>Login</Button>
        {error && <p className="error-message">{error}</p>}
        <p>Don't have an account? <Link to="/register">Create one</Link></p>
    </div>
}

export default Login