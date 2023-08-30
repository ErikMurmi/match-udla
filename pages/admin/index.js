
import Image from 'next/image'
import Basket from 'images/basket.png'
import Futbol from 'images/futbol.jpg'
import Mapache from 'images/mapache.jpg'
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter();


  function verCancha(campus,cancha){
    router.push(`admin/canchas?campus=${campus}&cancha=${cancha}`)
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
