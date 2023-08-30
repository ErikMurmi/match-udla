import Link from "next/link"
import styles from '../styles/Navbar.module.css'
import { auth } from "config/client"
import useUser from "hooks/useUser"
import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { getUserInfo } from 'config/client'
import Logo from 'images/udla_logo.png'
import Image from "next/image"

export const NavBarAdmin = () => {
    // const user = useUser()
    // const [userInfo,setUserInfo] = useState('')
    // useEffect(()=>{
    //     async function getInfo(){
    //         const info = await getUserInfo(user)
    //         setUserInfo(info)
    //         console.log('User info',userInfo)
    //         //console.log('Tipo: ', info.tipo==1?'user':'admin')
    //     }
    //     if(user){
    //         getInfo()
    //     }
    // },[user])

    return (
        <nav className={styles.navbar}>
            <ul>
                <Image src={Logo} height={30} ></Image>
                <li>
                    <Link href='/'>
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link href='Solicitud'>
                        Reservas de hoy
                    </Link>
                </li>
                <li>
                    <Link href='Solicitud'>
                        Solcitudes Pendientes
                    </Link>
                </li>
                <li>
                    <Link href='Solicitud'>
                        Solicitud
                    </Link>
                </li>
            </ul>
        </nav>
    )
}