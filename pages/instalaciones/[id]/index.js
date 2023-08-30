import { getInstalacion} from "controllers/instalacionesController"
import { useState, useEffect} from "react"
import { useRouter } from "next/router"
import { InstalacionCard } from "components/instalacionCard"
import { addReserva } from "controllers/reservasController"
import {getUserInfo} from "config/client"
import useUser from "hooks/useUser"

export default function Instalacion(props){

    const router = useRouter()
    const [fecha,setFecha] = useState(new Date().toISOString().substring(0,10))
    const [horariosDisponibles,setHorariosDisponibles] = useState([])
    const [horarioReserva,setHorarioReserva] = useState([])
    const [desafio,setDesafio] = useState(false)
    const [reserva,setReserva] = useState({
        horario:[],
        usuario:'',
        fecha:fecha,
        instalacion:props.Instalacion._id,
        desafio:desafio
    })
    const user = useUser()
    //const user = {_id:"63463b29ea2bf5db90490593",nombre:"Erik"}

    useEffect(()=>{
        //calcularHorario()
        /**
         * Se consultan los horarios disponibles
         */
        async function getHorariosDisponibles(){
            console.log('instalacion id ',props.Instalacion._id)
            const response = await fetch(`http://localhost:3000/api/instalaciones/${props.Instalacion._id}/getHorariosDisponibles?fecha=${fecha}`)
            const horarios = await response.json()
            //console.log('disponibles cliente',horarios)
            setHorariosDisponibles(horarios)
        }

        getHorariosDisponibles()
    },[fecha])


    // async function getUserInfo(user){
    //     const res = await fetch(`http://localhost:3000/api/users/getByFirebaseId?firebase=${user.uid}`)
    //     return await res.json() 
    // }

    /**
     * Actualiza la fecha de la reserva
     * @param {e} elemento html que llama el metodo 
     */
    const handleFechaChange = (e) => {
        const {value} = e.target
        setFecha(new Date(value).toISOString().substring(0,10))
    }

    /**
     * Actualiza el horario de la reserva al iteractuar los checkbox
     * @param {e} elemento html que llama el metodo 
     */
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
        
        const userInfo = await getUserInfo(user)
        reserva.usuario = userInfo._id
        //console.log('userInfo',reserva)
        if(!horarioReserva.length>0){
            alert("Debes seleccionar un horario")
            return
        }
        reserva.desafio = desafio
        /**
         * Se comprueba si esta abierta a desafio para crear el objeto
         */
        const result = await addReserva(reserva)

        if (result.ok){
            router.push('/instalaciones')
            alert("reserva realizada")
        }else{
            alert('No se pudo crear tu reserva')
        }
    }

    return(
        <div> 
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
    return(
        {
            props:{
                Instalacion:instalacion,
            }
        }
    )
}