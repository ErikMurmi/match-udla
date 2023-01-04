import { signIn } from "next-auth/react"
import { getCsrfToken } from "next-auth/react"
import { useState } from "react"

export default function SignIn({ csrfToken }){

    async function handleSubmit(e){
        e.preventDefault()
        console.log( {...credentials,callbackUrl: `/instalaciones`})
        const res = await signIn("credentials", {...credentials,callbackUrl: `/instalaciones`})
        console.log('res: ',res)
    }

    const [credentials,setCredentials] = useState({ email: "", password: "" })

    const handleChange = (e) => {
        const { value, name } = e.target
        setCredentials({ ...credentials, [name]: value })
    }

    // return(
    // <div>
    //     <form onSubmit={handleSubmit} id="login-form">
    //         <h1>Login</h1>
    //         <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
    //         <label htmlFor="email">Correo electrónico</label>
    //         <input name='email' type="email" onChange={handleChange}/>
    //         <label htmlFor="password">Contraseña</label>
    //         <input name="password" onChange={handleChange} type="password"/>
            
    //         <input type="submit"/>
    //     </form>
    // </div>)

    async function signinUser(e){
        e.preventDefault()
        let options = {callbackUrl: `/instalaciones`,redirect:false,...credentials}
        const res = await signIn("credentials",options)
        //console.log('options',options)
        console.log(res)
    }

    return(
    <div>
        <form id="login-form">
            <h1>Login</h1>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <label htmlFor="email">Correo electrónico</label>
            <input name='email' type="email" onChange={handleChange}/>
            <label htmlFor="clave">Contraseña</label>
            <input name="password" onChange={handleChange} type="password"/>
            
            <button onClick={(e)=>{signinUser(e)}} >Sign in</button>
        </form>
    </div>)
}

export async function getServerSideProps(context) {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    }
}