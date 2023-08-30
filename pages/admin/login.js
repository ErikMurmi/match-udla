import { useState } from "react"
import { auth } from "config/client"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/router"

export default function SignIn(){

    const router = useRouter()
    const [credentials,setCredentials] = useState({ email: "", password: "" })

    const handleChange = (e) => {
        const { value, name } = e.target
        setCredentials({ ...credentials, [name]: value })
    }

    async function signIn(form) {
        form.preventDefault()
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
            //const userInfo = await getUserInfo(userCredential.user)
            //reserva.usuario = userInfo._id
            router.push('/')}
        )
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Credenciales invalidas")
            console.log("code:", errorCode, "msg:", errorMessage)
            return false
        });
    }

    return(
    <div>
        <form id="login-form">
            <h1>Login</h1>
            <label htmlFor="email">Correo electrónico</label>
            <input name='email' type="email" onChange={handleChange}/>
            <label htmlFor="clave">Contraseña</label>
            <input name="password" onChange={handleChange} type="password"/> 
            <button onClick={(form)=>{signIn(form)}} >Sign in</button>
        </form>
    </div>)
}