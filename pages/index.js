import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Logo from 'images/playc-white-logo.png'
import Basket from 'images/basket.png'
import Futbol from 'images/futbol.jpg'
import Mapache from 'images/mapache.jpg'
import { signIn } from "next-auth/react"
import SignIn from './admin/login'
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter();


  function verCancha(campus,cancha){
    router.push(`public/canchas?campus=${campus}&cancha=${cancha}`)
  }

  return (
    <div className='home'>
      <Image className='home-image' src={Basket} onClick={()=>verCancha("udlapark","futbol")}></Image>
      <div className='home-right'>
        <Image className='home-image-right' src={Mapache} onClick={()=>verCancha("granados","basket")}>
        </Image>
        <Image className='home-image-right' src={Futbol} onClick={()=>verCancha("granados","futbol")}>
        </Image>
      </div>
    </div>
  )
}
