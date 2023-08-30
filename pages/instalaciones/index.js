import { getInstalaciones } from "controllers/instalacionesController"
import { useRouter } from "next/router"
import { deportes } from "utils/deportes"
import { useState } from "react"
import { InstalacionCard } from "components/instalacionCard"
import useUser from "hooks/useUser"

export default function Instalaciones({Instalaciones}){

    const router = useRouter()
    // const user = useUser();
    const [listaInstalaciones,setInstalaciones] = useState(Instalaciones)
    

    async function handleChange(e){
        const {value} = e.target
        const response = await fetch(`http://localhost:3000/api/instalaciones/getBySport?sport=${value}`,)
        const data = await response.json()
        setInstalaciones(data)
    }

    return(
        <div className="page-container">
            <h1>Encuentra tu lugar para jugar</h1>
            <p> Escoje tu deporte</p>
            <select name="deporte" id="deporte" onChange={handleChange} defaultValue={'Todos'}
                            >
                            <option key={0} value={'Todos'}>{'Todos'}</option>
                            {deportes.map((deporte,index) => (
                                <option key={index} value={deporte}>{deporte}</option>
                            ))}
            </select>
            <div id="horizontal-flex" className="cards-container" >
                {listaInstalaciones.map((instalacion,index)=>(
                    // <div key={index} onClick={()=>router.push(`/instalaciones/${instalacion._id}`)} className="instalacion-card">{JSON.stringify(instalacion)}</div>
                    <InstalacionCard key={index} instalacion={instalacion} clicked={()=>router.push(`/instalaciones/${instalacion._id}`)}>
                    </InstalacionCard>
                ))}
            </div>
        </div>
    )
}

export const getServerSideProps = async()=>{
    const instalaciones = await getInstalaciones()
    //console.log(instalaciones)
    return{
        props:{
            Instalaciones:instalaciones
        }
    }
}