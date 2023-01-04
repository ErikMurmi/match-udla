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
    //console.log('reservas ',reservas)
    const horariosDisponibles = calcularHorariosDisponibles(horario,reservas)
    res.status(200).json(horariosDisponibles)

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
}

function calcularHorariosDisponibles(horario,reservas){
    const inicio = parseInt(horario.inicio.substring(0,3))
    const fin = parseInt(horario.fin.substring(0,3))
    let disponibles = []
    for(let i = inicio ; i<fin ; i++){
        const hor = {inicio:`${i}:00`,fin:`${i +1}:00`}
        if(!reservas.find(reserva=>comprobarOcupada(reserva,i)))
            disponibles.push(hor)       
    }
    return disponibles
}

function comprobarOcupada(reserva,hora){
    const ocupada = reserva.horario.find((h)=>h.inicio===`${hora}:00`)
    return ocupada!==undefined
}