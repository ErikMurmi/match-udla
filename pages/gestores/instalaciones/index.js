import { getInstalaciones } from "controllers/instalacionesController"
import { useRouter } from "next/router"
import mongoose from "mongoose"
import { InstalacionCard } from "components/instalacionCard"

export default function Instalaciones({Instalaciones}){

    const router = useRouter()
    console.log(Instalaciones)
    return(
        <div>
            <h1>Mis lugares</h1>
            <div id="horizontal-flex" className="cards-container" >
                {Instalaciones.map((instalacion,index)=>(
                    // <div key={index} onClick={()=>router.push(`/instalaciones/${instalacion._id}`)} className="instalacion-card">{JSON.stringify(instalacion)}</div>
                    <InstalacionCard key={index} instalacion={instalacion} clicked={()=>router.push(`/gestores/instalaciones/${instalacion._id}`)}>
                    </InstalacionCard>
                ))}
            </div>
        </div>
    )
}

export const getServerSideProps = async()=>{
    const instalaciones = await getInstalaciones()
    console.log(instalaciones)
    return{
        props:{
            Instalaciones:instalaciones
        }
    }
}