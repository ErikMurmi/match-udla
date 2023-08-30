const { useRouter, Router } = require("next/router");
import { useState, useEffect } from "react"
import { InstalacionCard } from "components/instalacionCard"
import Solicitud from "components/solicitud";

export default function Canchas(props) {
    const { router, query } = useRouter();
    const [fecha, setFecha] = useState(new Date().toISOString().substring(0, 10))
    //const [horariosDisponibles,setHorariosDisponibles] = useState([])
    const [horarioReserva, setHorarioReserva] = useState([])
    const [desafio, setDesafio] = useState(false)
    const [reserva, setReserva] = useState({
        horario: [],
        usuario: '',
        fecha: fecha,
        instalacion: props.Instalacion._id,
        desafio: desafio
    })

    const [showSolcitud, setShowSolicitud] = useState(false)


    console.log(query)


    /**
 * Actualiza el horario de la reserva al iteractuar los checkbox
 * @param {e} elemento html que llama el metodo 
 */
    const handleHoraReserva = (e) => {
        const { value, checked } = e.target
        const horario = JSON.parse(value)
        console.log('checkbox value ', horario)
        if (checked) {
            setHorarioReserva([...horarioReserva, horario])
            setReserva({ ...reserva, ['horario']: [...horarioReserva, horario] })
        } else {
            let h = Array.from(horarioReserva.filter((item) => item.inicio !== horario.inicio))
            setHorarioReserva(h)
        }

    }

    /**
 * Actualiza la fecha de la reserva
 * @param {e} elemento html que llama el metodo 
 */
    const handleFechaChange = (e) => {
        const { value } = e.target
        setFecha(new Date(value).toISOString().substring(0, 10))
    }

    const horariosDisponibles = [
        {
            "inicio": "07:00",
            "fin": "08:00"
        },
        {
            "inicio": "08:00",
            "fin": "09:00"
        },
        {
            "inicio": "09:00",
            "fin": "10:00"
        },
        {
            "inicio": "10:00",
            "fin": "11:00"
        },
        {
            "inicio": "11:00",
            "fin": "12:00"
        },
        {
            "inicio": "12:00",
            "fin": "13:00"
        },
        {
            "inicio": "13:00",
            "fin": "14:00"
        },
        {
            "inicio": "14:00",
            "fin": "15:00"
        },
        {
            "inicio": "15:00",
            "fin": "16:00"
        },
        {
            "inicio": "16:00",
            "fin": "17:00"
        },
        {
            "inicio": "17:00",
            "fin": "18:00"
        },
        {
            "inicio": "18:00",
            "fin": "19:00"
        },
        {
            "inicio": "19:00",
            "fin": "20:00"
        }
    ]


    const handleSubmitReserva = async (form) => {
        form.preventDefault()

        const userInfo = await getUserInfo(user)
        reserva.usuario = userInfo._id
        //console.log('userInfo',reserva)
        if (!horarioReserva.length > 0) {
            alert("Debes seleccionar un horario")
            return
        }
        reserva.desafio = desafio
        /**
         * Se comprueba si esta abierta a desafio para crear el objeto
         */
        const result = await addReserva(reserva)

        if (result.ok) {
            router.push('/instalaciones')
            alert("reserva realizada")
        } else {
            alert('No se pudo crear tu reserva')
        }
    }


    return (
        <div className="home">
            <div className="mid-dis-container">
                <InstalacionCard instalacion={props.Instalacion}></InstalacionCard>
                {/* <label htmlFor="desafio">Abrir para desafío</label>
                        <input type="checkbox" name="desafio" onChange={handleDesafio}></input> */}
            </div>
            {/* <form className="mid-dis-container" onSubmit={handleSubmitReserva}>
                <label htmlFor="fecha">Escoje una fecha</label>
                <input type="date" id="fechaReserva" name="fecha" onChange={handleFechaChange}
                    defaultValue={fecha}></input>
                <input type="submit" value="Reservar" />
            </form> */}
            {/* <h3>Horarios disponibles</h3> */}
            <div className="mid-dis-container">
                <h3>Escoje una fecha</h3>
                <form className="mid-dis-container" onSubmit={handleSubmitReserva}>
                    <input className="fecha-selector" style={{ "alignSelf": "flex-start" }}
                        type="date" id="fechaReserva" name="fecha" onChange={handleFechaChange}
                        defaultValue={fecha}></input>

                </form>
                <h3>Horarios disponibles</h3>
                <p>Máximo dos horarios consecutivos*</p>
                <br/>
                <div className="horarios-container">
                    {horariosDisponibles.map((horario, index) => (
                        <div className="horario" key={index}>
                            <label htmlFor="horario">{`${horario.inicio}-${horario.fin}`}</label>
                            <input type="checkbox" name="horario" onChange={handleHoraReserva}
                                value={JSON.stringify(horario)}
                                title={"horario"} placeholder={"Horario"}
                            >
                            </input>
                        </div>
                    ))}
                </div>
                <br />
                <button type="submit" className="reservar-btn" onClick={()=>(setShowSolicitud(true))}>Reservar</button>
            </div>

            {showSolcitud ?
                <div className="modal-overlay">
                    <div className="modal">
                        <Solicitud show={setShowSolicitud}/>
                    </div>
                </div>
                : null}
        </div>

    )


}

// import { getInstalacion} from "controllers/instalacionesController"
// import { useState, useEffect} from "react"
// import { useRouter } from "next/router"
// import { InstalacionCard } from "components/instalacionCard"
// import { addReserva } from "controllers/reservasController"
// import {getUserInfo} from "config/client"
// import useUser from "hooks/useUser"

// export default function Instalacion(props){

//     const router = useRouter()
//     const [fecha,setFecha] = useState(new Date().toISOString().substring(0,10))
//     const [horariosDisponibles,setHorariosDisponibles] = useState([])
//     const [horarioReserva,setHorarioReserva] = useState([])
//     const [desafio,setDesafio] = useState(false)
//     const [reserva,setReserva] = useState({
//         horario:[],
//         usuario:'',
//         fecha:fecha,
//         instalacion:props.Instalacion._id,
//         desafio:desafio
//     })
//     const user = useUser()
//     //const user = {_id:"63463b29ea2bf5db90490593",nombre:"Erik"}

//     useEffect(()=>{
//         //calcularHorario()
//         /**
//          * Se consultan los horarios disponibles
//          */
//         async function getHorariosDisponibles(){
//             console.log('instalacion id ',props.Instalacion._id)
//             const response = await fetch(`http://localhost:3000/api/instalaciones/${props.Instalacion._id}/getHorariosDisponibles?fecha=${fecha}`)
//             const horarios = await response.json()
//             //console.log('disponibles cliente',horarios)
//             setHorariosDisponibles(horarios)
//         }

//         getHorariosDisponibles()
//     },[fecha])


//     // async function getUserInfo(user){
//     //     const res = await fetch(`http://localhost:3000/api/users/getByFirebaseId?firebase=${user.uid}`)
//     //     return await res.json() 
//     // }

//     /**
//      * Actualiza la fecha de la reserva
//      * @param {e} elemento html que llama el metodo 
//      */
//     const handleFechaChange = (e) => {
//         const {value} = e.target
//         setFecha(new Date(value).toISOString().substring(0,10))
//     }

//     /**
//      * Actualiza el horario de la reserva al iteractuar los checkbox
//      * @param {e} elemento html que llama el metodo 
//      */
//     const handleHoraReserva = (e) => {
//         const {value,checked} = e.target
//         const horario = JSON.parse(value)
//         console.log('checkbox value ',horario)
//         if (checked){
//             setHorarioReserva([...horarioReserva,horario])
//             setReserva({...reserva,['horario']:[...horarioReserva,horario]})
//         }else{
//             let h = Array.from(horarioReserva.filter((item)=>item.inicio!==horario.inicio))
//             setHorarioReserva(h)
//         }

//     }

//     const handleDesafio=(e) => {
//         const {checked} = e.target
//         setDesafio(checked)
//     }


//     const handleSubmitReserva=async(form)=>{
//         form.preventDefault()

//         const userInfo = await getUserInfo(user)
//         reserva.usuario = userInfo._id
//         //console.log('userInfo',reserva)
//         if(!horarioReserva.length>0){
//             alert("Debes seleccionar un horario")
//             return
//         }
//         reserva.desafio = desafio
//         /**
//          * Se comprueba si esta abierta a desafio para crear el objeto
//          */
//         const result = await addReserva(reserva)

//         if (result.ok){
//             router.push('/instalaciones')
//             alert("reserva realizada")
//         }else{
//             alert('No se pudo crear tu reserva')
//         }
//     }


// }

export async function getServerSideProps({ query: id }) {
    // const instalacion = await getInstalacion(id)
    const instalacion = {
        "horarios": {
            "lun_vie": {
                "inicio": "9:00",
                "fin": "21:00"
            },
            "finde": {
                "inicio": "13:00",
                "fin": "17:00"
            },
            "feriado": {
                "inicio": "13:00",
                "fin": "16:00"
            }
        },
        "_id": "6382c706a89ff784a1b3e0c9",
        "titulo": "Joga Bonito",
        "deporte": "Fútbol",
        "precio": 4,
        "direccion": "Calle Pululahua E2-08 y Pucará",
        "descripcion": "sintética",
        "createdAt": "2022-11-27T02:10:14.172Z",
        "updatedAt": "2023-01-02T20:39:00.141Z",
        "reservas": [
            {
                "horario": [
                    {
                        "inicio": "10:00",
                        "fin": "11:00"
                    },
                    {
                        "inicio": "11:00",
                        "fin": "12:00"
                    }
                ],
                "abierta": true,
                "usuario": "63463b29ea2bf5db90490593",
                "adversario": "",
                "fecha": "2022-11-30"
            }]
    }
    return (
        {
            props: {
                Instalacion: instalacion,
            }
        }
    )
}