import Desafio from "models/Desafio"
import Reserva from "models/Reserva"
import Instalacion from "models/Instalacion"

export default async function filterDateRange(req,res){
    let desafiosFiltro = []
    const {inicio,fin,deporte} = req.query
    if(!inicio || !fin || !deporte){
        res.status(400).send("Se debe enviar un rango de fechas para el filtro")
        return
    }

    const desafios = await Desafio.find()
    
    for (const desafio of desafios) {
        var reserva = await Reserva.findById(desafio.reserva,'fecha instalacion').exec()
        var reservaFecha = new Date(reserva.fecha).toISOString().substring(0,10)
        if(reservaFecha >= inicio && reservaFecha <= fin){
            console.log("Fecha reserva: ", reservaFecha)
            var instalacion = await Instalacion.findById(reserva.instalacion,'deporte').exec()
            if(instalacion.deporte ===deporte || deporte==="Todos"){
                desafiosFiltro.push(desafio)
            }
        }
    };
    
    res.status(200).json(desafiosFiltro)

}