import Link from "next/link"
import styles from '../styles/Navbar.module.css'

export const NavBar =()=>{
    return(
        <nav className={styles.navbar}>
            <ul>
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