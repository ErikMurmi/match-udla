import Link from "next/link"
import styles from '../styles/Navbar.module.css'
import Logo from 'images/udla_logo.png'
import Image from "next/image"

export const NavBar =()=>{
    return(
        <nav className={styles.navbar}>
            
            <ul style={{"alignItems":"center"}}>
            <Image src={Logo} height={30} ></Image>
            <Link href='/'>
                <li>Inicio</li>
            </Link>
                <Link href='/instalaciones'>
                    <li>Udla Park</li>
                </Link>
                <Link href='/desafios'>
                    <li>Granados</li>
                </Link> 
            </ul>
        </nav>
    )
}