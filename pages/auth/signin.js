import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SignIn(){

    async function handleSubmit(e){
        e.preventDefault()
        console.log( {...credentials,callbackUrl: `/instalaciones`})
        const res = await signIn("Credentials", {...credentials,callbackUrl: `/instalaciones`})
        console.log('res: ',res)
    }

    const [credentials,setCredentials] = useState({ Email: "", Clave: "" })

    const handleChange = (e) => {
        const { value, name } = e.target
        setCredentials({ ...credentials, [name]: value })
    }

    return(
    <div>
        <form onSubmit={handleSubmit} id="login-form">
            <h1>Login</h1>
            <label htmlFor="email">Correo electrónico</label>
            <input name='Email' type="email" onChange={handleChange}/>
            <label htmlFor="clave">Contraseña</label>
            <input name="Clave" onChange={handleChange} type="password"/>
            
            <input type="submit"/>
        </form>
    </div>)
}