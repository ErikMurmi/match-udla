import Instalacion from "models/Instalacion"

export default async function getHorariosDisponibles(req,res){
    const baseUrl = process.env.NEXT_PUBLIC_base_api_url
    let horario = null
    const {id,fecha} = req.query

    if(!id && !fecha){
        res.status(400).send("Se debe enviar un id y una fecha")
        return
    }
    const instalacion = await Instalacion.findById(id,'horarios')
    
    horario = calcularHorario(instalacion,fecha)
    const response = await fetch(`${baseUrl}reservas/getByInstalacionAndFecha?fecha=${fecha}&id=${id}`)
    const reservas = await response.json()
    console.log('reservas ',reservas)
    const horariosDisponibles = calcularHorariosDisponibles(horario,reservas)
    console.log('horariosDisponibles ',horariosDisponibles)
    res.status(200).json(req.query)

}

function calcularHorario(instalacion,fecha){
    const dia = new Date(fecha).getDay()
    let hor = undefined
    if ( dia>=0 && dia<=4 ){
        hor = instalacion.horarios.lun_vie
    }else if (dia>4){
        hor = instalacion.horarios.finde
    }
    return hor
    //calcularHorariosDisponibles(hor)
}

function calcularHorariosDisponibles(horario,reservas){
    const inicio = parseInt(horario.inicio.substring(0,3))
    const fin = parseInt(horario.fin.substring(0,3))
    //console.log('reservas de este dia ', reservas)
    let disponibles = []
    for(let i = inicio ; i<fin ; i++){
        const hor = {inicio:`${i}:00`,fin:`${i +1}:00`}
        if(reservas.find(reserva=>comprobarOcupada(reserva,i)))
            console.log('encontre una reserva en este horario ',hor)
        else
            disponibles.push(hor)
    }
    //console.log('disponibles',disponibles)
    //setHorariosDisponibles(disponibles)
    return disponibles
}

function comprobarOcupada(reserva,hora){
    const ocupada = reserva.horario.find((h)=>h.inicio===`${hora}:00`)
    console.log('ocupada: ',ocupada, ` hora ${hora}:00`)
    return ocupada!==undefined
}