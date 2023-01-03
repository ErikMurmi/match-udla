import Desafio from "models/Desafio"
import Reserva from "models/Reserva"
import Instalacion from "models/Instalacion"

export default async function getBySport(req,res){
    let desafiosFiltro = []
    const {sport} = req.query
    if(!sport){
        res.status(400).send("Se debe enviar un deporte para el filtro")
        return
    }

    const desafios = await Desafio.find()
    if(sport==="Todos"){
        desafiosFiltro = desafios
    }else{  
        for (const desafio of desafios) {
            var reserva = await Reserva.findById(desafio.reserva,'instalacion').exec()
            console.log(reserva)
            var instalacion = await Instalacion.findById(reserva.instalacion,'deporte').exec()
            //console.log(instalacion," filtro : ", sport , "comparacion: ",instalacion.deporte ===sport)
            if(instalacion.deporte ===sport){
                //console.log('coincide')
                desafiosFiltro.push(desafio)
            }
        };
    }
    res.status(200).json(desafiosFiltro)

}