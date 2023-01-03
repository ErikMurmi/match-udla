import { getInstalacion,updateInstalacion } from "controllers/instalacionesController"
import { set } from "mongoose"
import { useState, useEffect} from "react"
import { useRouter } from "next/router"
import { InstalacionCard } from "components/instalacionCard"
import { Desafio } from "components/desafio"
export default function Instalacion(props){

    const router = useRouter()
    const [fecha,setFecha] = useState(new Date().toISOString().substring(0,10))
    const [horario,setHorario] = useState(null)
    const [reservas,setReservas] = useState([])
    const [desafios,setDesafios] = useState([])
    const user = {_id:"63463b29ea2bf5db90490593",nombre:"Erik"}

    useEffect(()=>{
        calcularHorario()
    },[fecha])

    useEffect(()=>{
        consultarDesafios()
    },[reservas])

    function calcularHorario(){
        const dia = new Date(fecha).getDay()
        let hor = undefined
        if ( dia>=0 && dia<=4 ){
            //console.log('semanal')
            hor = props.Instalacion.horarios.lun_vie
            setHorario(hor)
            //calcularHorariosDisponibles()
        }else if (dia>4){
            //console.log('finde')
            // setHorario(props.Instalacion.horarios.finde)
            hor = props.Instalacion.horarios.finde
            setHorario(hor)
        }
        // if(horario)
        calcularHorariosDisponibles(hor)
    }

    function calcularHorariosDisponibles(horario){
        const reservas = props.Instalacion.reservas.filter((reserva)=>reserva.fecha === fecha) 
        console.log('reservas de este dia ', reservas)
        //console.log('disponibles',disponibles)
        setReservas(reservas)
    }

    function comprobarOcupada(reserva,hora){
        //console.log('hora ',`${hora}:00`, 'reserva ','reserva.hora')
        const ocupada = reserva.horario.find((h)=>h.inicio===`${hora}:00`)
        console.log('ocupada: ',ocupada, ` hora ${hora}:00`)
        return ocupada!==undefined
    }

    const handleFechaChange = (e) => {
        const {value} = e.target
        //let f = new Date(value)
        setFecha(new Date(value).toISOString().substring(0,10))
        //console.log('Fecha ', f.toISOString().substring(0,10))
    }


    function consultarDesafios(){
        console.log('las reservas son :',reservas)
        const dfs = reservas.filter(reserva=>(reserva.abierta && reserva.adversario===""))
        console.log('los desafios son :',desafios)
        setDesafios(dfs)
    }

    return(
        <div> 
        <h3>Desafios disponibles</h3>
        <div>
            {desafios.length>0?desafios.map((desafio,index)=>(
                    <Desafio key={index} desafio={desafio} ></Desafio>
            ))
             :null}
        </div>
        <div id="horizontal-flex" className="reserva-container">
            <div  style={{width:"40%"}}>
                <h3>Instalacion</h3>
                <InstalacionCard instalacion={props.Instalacion}></InstalacionCard>
            </div>
            <div>
                <h3>Reservas de {fecha}</h3>
                <label htmlFor="fecha">Selecciona una fecha  </label>
                <input type="date" id="fechaReserva" name="fecha" onChange={handleFechaChange}
                    defaultValue={fecha}></input>
                {horario?<p>{`El dia de hoy ${horario.inicio}-${horario.fin}`}</p>:null}
                <div id="vertical-flex">
                {reservas.map((reserva, index) => (  
                    <div key={index} className="reserva-item" >
                        {/* <label>{`${horario.inicio}-${horario.fin}`}</label>
                        <input type="checkbox" onChange={handleHoraReserva}
                         value={JSON.stringify(horario)}></input> */}
                         <p>{JSON.stringify(reserva)}</p>
                         <button>Cancelar</button>
                    </div>
                ))}
                </div>
            </div>
           
        </div>
     </div>

    )
}

export async function getServerSideProps({query:id}){
    const instalacion = await getInstalacion(id)
    return(
        {
            props:{
                Instalacion:instalacion,
            }
        }
    )
}