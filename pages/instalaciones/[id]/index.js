import { getInstalacion,updateInstalacion } from "controllers/instalacionesController"
import { set } from "mongoose"
import { useState, useEffect} from "react"
import { useRouter } from "next/router"
import { InstalacionCard } from "components/instalacionCard"
import { Desafio } from "components/desafio"
import { addDesafio } from "controllers/desafiosController"
import { addReserva } from "controllers/reservasController"
export default function Instalacion(props){

    const router = useRouter()
    const [fecha,setFecha] = useState(new Date().toISOString().substring(0,10))
    const [horario,setHorario] = useState(null)
    const [horariosDisponibles,setHorariosDisponibles] = useState([])
    const [horarioReserva,setHorarioReserva] = useState([])
    const [desafio,setDesafio] = useState(false)
    const [reserva,setReserva] = useState({
        horario:[],
        usuario:'63463b29ea2bf5db90490593',
        fecha:fecha,
        instalacion:props.Instalacion._id
    })
    const user = {_id:"63463b29ea2bf5db90490593",nombre:"Erik"}

    useEffect(()=>{
        calcularHorario()
    },[fecha])

    // useEffect(()=>{
    //     if(horario)
    //         calcularHorariosDisponibles()
    // },[horario])

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
        const inicio = parseInt(horario.inicio.substring(0,3))
        const fin = parseInt(horario.fin.substring(0,3))
        const reservas = props.Instalacion.reservas.filter((reserva)=>reserva.fecha === fecha) 
        console.log('reservas de este dia ', reservas)
        let disponibles = []
        for(let i = inicio ; i<fin ; i++){
            const hor = {inicio:`${i}:00`,fin:`${i +1}:00`}
            if(reservas.find(reserva=>comprobarOcupada(reserva,i)))
                console.log('encontre una reserva en este horario ',hor)
            else
                disponibles.push(hor)
            //console.log(`${i}:00-${i +1}:00`)
        }
        //console.log('disponibles',disponibles)
        setHorariosDisponibles(disponibles)
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

    const handleHoraReserva = (e) => {
        const {value,checked} = e.target
        const horario = JSON.parse(value)
        console.log('checkbox value ',horario)
        if (checked){
            setHorarioReserva([...horarioReserva,horario])
            setReserva({...reserva,['horario']:[...horarioReserva,horario]})
        }else{
            let h = Array.from(horarioReserva.filter((item)=>item.inicio!==horario.inicio))
            setHorarioReserva(h)
        }
        
    }

    const handleDesafio=(e) => {
        const {checked} = e.target
        setDesafio(checked)
    }


    const handleSubmitReserva=async(form)=>{
        form.preventDefault()
        if(!horarioReserva.length>0){
            alert("Debes seleccionar un horario")
            return
        }
        let instalacion = props.Instalacion
        reserva.fecha = fecha
        instalacion.reservas.push(reserva)
        
        /**
         * Se comprueba si esta abierta a desafio para crear el objeto
         */

        

        //const result = await updateInstalacion({newInstalacion:instalacion})
        //console.log(result)
        const result = await addReserva(reserva)
        console.log(result)
        /**
         * Se agrega el desafio
         */
       
        if(desafio){
            console.log("desafio ", {horario:reserva.horario,
                usuario:reserva.usuario,})
            await addDesafio(
                {horario:reserva.horario,
                usuario:reserva.usuario,
            })
        }
        // if (result.ok)
        //     //router.push('/instalaciones')
        //     alert("reserva realizada")
        // else{
        //     alert('No se pudo crear tu reserva')
        // }
    }

    function consultarDesafios(){
        const desafios = props.Instalacion.reservas.filter(reserva=>(reserva.abierta && reserva.adversario===""))
        console.log('los desafios son :',desafios)
        return desafios
    }

    return(
        <div> 
        <h3>Desafios disponibles</h3>
        <div>
            {/* {props.desafios.length>0?props.desafios.map((desafio,index)=>(
                    <Desafio key={index} desafio={desafio} ></Desafio>
            ))
             :null} */}
        </div>
        <form onSubmit={handleSubmitReserva}>
        <div id="horizontal-flex" className="reserva-container">
            <div  style={{width:"40%"}}>
                <h3>Instalacion</h3>
                <InstalacionCard instalacion={props.Instalacion}></InstalacionCard>
                <label htmlFor="desafio">Abrir para desafío</label>
                <input type="checkbox" name="desafio" onChange={handleDesafio}></input>
            </div>
            <div>
                <h3>Horarios disponibles</h3>
                {horario?<p>{`El dia de hoy ${horario.inicio}-${horario.fin}`}</p>:null}
                <div id="vertical-flex">
                {horariosDisponibles.map((horario, index) => (  
                    <div key={index}>
                        <label>{`${horario.inicio}-${horario.fin}`}</label>
                        <input type="checkbox" onChange={handleHoraReserva}
                         value={JSON.stringify(horario)}></input>
                    </div>
                ))}
                </div>
            </div>
           
        </div>
        
         <label htmlFor="fecha">Escoje una fecha</label>
         <input type="date" id="fechaReserva" name="fecha" onChange={handleFechaChange}
         defaultValue={fecha}></input>
         <input type="submit" value="Reservar"/>
        </form>
     </div>

    )
}

export async function getServerSideProps({query:id}){
    const instalacion = await getInstalacion(id)
    console.log(instalacion)
    return(
        {
            props:{
                Instalacion:instalacion,
            }
        }
    )
}