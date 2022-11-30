import { getInstalacion,updateInstalacion } from "controllers/instalacionesController"
import { set } from "mongoose"
import { useState, useEffect} from "react"
import { useRouter } from "next/router"
import { InstalacionCard } from "components/instalacionCard"
import { Desafio } from "components/desafio"
export default function Instalacion(props){
    //console.log('props,',props)
    const ins = JSON.stringify(props)
    const [fecha,setFecha] = useState(new Date().toISOString().substring(0,10))
    const [horario,setHorario] = useState(null)
    const [horariosDisponibles,setHorariosDisponibles] = useState([])
    const [horarioReserva,setHorarioReserva] = useState([])
    const {query} = useRouter()
    const [reserva,setReserva] = useState({
        'horario':[],
        abierta:false,
        usuario:'63463b29ea2bf5db90490593',
        adversario:"",
    })
    const user = {_id:"63463b29ea2bf5db90490593",nombre:"Erik"}

    useEffect(()=>{
        //console.log('dia', new Date(fecha).getDay())
        calcularHorario()
    },[fecha])

    // useEffect(()=>{
    //     //console.log('dia', new Date(fecha).getDay())
    //     setFecha(new Date().toISOString().substring(0,10))
    // },[])

    useEffect(()=>{
        if(horario)
            calcularHorariosDisponibles()
    },[horario])

    function calcularHorario(){
        const dia = new Date(fecha).getDay()
        //console.log('El dia es ',dia)
        if ( dia>=0 && dia<=4 ){
            //console.log('semanal')
            setHorario(props.Instalacion.horarios.lun_vie)
        }else if (dia>4){
            //console.log('finde')
            setHorario(props.Instalacion.horarios.finde)
        }
    }

    function calcularHorariosDisponibles(){
        const inicio = parseInt(horario.inicio.substring(0,3))
        const fin = parseInt(horario.fin.substring(0,3))
        //console.log('horario ',horario)
        let disponibles = []
        for(let i = inicio ; i<fin ; i++){
            const horario = {inicio:`${i}:00`,fin:`${i +1}:00`}
            disponibles.push(horario)
            //console.log(`${i}:00-${i +1}:00`)
        }
        //console.log('disponibles',disponibles)
        setHorariosDisponibles(disponibles)
    }

    const handleFechaChange = (e) => {
        const {value} = e.target
        let f = new Date(value)
        setFecha(new Date(value))
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

    useEffect(()=>{
        console.log('reserva actualizado',horarioReserva)
        //console.log(typeof horarioReserva)
    },[horarioReserva])

    const handleSubmitReserva=async(form)=>{
        form.preventDefault()
        if(!horarioReserva.length>0){
            alert("Debes seleccionar un horario")
            return
        }
        //const inst = JSON.parse()
        let instalacion = props.Instalacion
        //const query = props.query
        instalacion.reservas.push(reserva)
        //console.log('query cliente:',query)
        const result = await updateInstalacion({newInstalacion:instalacion})
        console.log(result)
    }

    function consultarDesafios(){
        const desafios = props.Instalacion.reservas.filter(reserva=>(reserva.abierta && reserva.adversario===""))
        console.log('los desafios son :',desafios)
        return desafios
    }

    return(
        <div> 
        <h3>Desafios disponibles</h3>
        {/* <p>{JSON.stringify(consultarDesafios())}</p> */}
        <div>
            {props.desafios.length>0?props.desafios.map((desafio,index)=>(
                    <Desafio key={index} desafio={desafio} ></Desafio>
            ))
             :null}
        </div>
        <form onSubmit={handleSubmitReserva}>
        <div id="horizontal-flex" className="reserva-container">
            <div  style={{width:"40%"}}>
                <h3>Instalacion</h3>
                <InstalacionCard instalacion={props.Instalacion}></InstalacionCard>
            </div>
            <div>
                <h3>Horarios disponibles</h3>
                {horario?<p>{`El dia de hoy ${horario.inicio}-${horario.fin}`}</p>:null}
            {/* <p>{JSON.stringify(horariosDisponibles)}</p> */}
                <div id="vertical-flex">
                {horariosDisponibles.map((horario, index) => (
                    // <p>{horario.inicio}</p>
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
    //console.log('quer',query.id)
    const instalacion = await getInstalacion(id)
    const desafios = instalacion.reservas.filter(reserva=>(reserva.abierta && reserva.adversario===""))
    console.log('desafios ',desafios)
    return(
        {
            props:{
                Instalacion:instalacion,
                desafios:desafios
            }
        }
    )
}