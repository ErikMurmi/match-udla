import Link from "next/link"
import styles from '../styles/Navbar.module.css'
import { signIn, useSession } from "next-auth/react"

export const NavBar =()=>{
    const { data: session } = useSession()

    return(
        <nav className={styles.navbar}>
            <ul>
            {session?null:<Link href='' onClick={()=>signIn()}>
                <li>Login</li>
            </Link>}
            
            <Link href='/'>
                <li>Home</li>
            </Link>
            <Link href='/instalaciones'>
                <li>Instalaciones</li>
            </Link>
            <Link href='/desafios'>
                <li>Desafios</li>
            </Link>
            </ul>
        </nav>
    )
}