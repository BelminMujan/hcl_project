import { useState } from "react"
import Input from "../../Components/Input/Input"
import Button from "../../Components/Button/Button"

const Register =()=>{
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] =useState()
    const [passwordConfirm, setPasswordConfirm] =useState()

    const handleRegister=()=>{
        
    }
    return <div>
        Register
        <Input label="E-Mail" value={email} onChange={setEmail}/>
        <Input label="Username" value={username} onChange={setUsername}/>
        <Input label="Password" value={password} onChange={setPassword}/>
        <Input label="Confirm password" value={passwordConfirm} onChange={setPasswordConfirm}/>
        <Button onClick={handleRegister}>Register</Button>
    </div>
}

export default Register