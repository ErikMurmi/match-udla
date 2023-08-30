import Reserva from "models/Reserva"
import { dbConnect } from "utils/mongoose"

dbConnect()

export default async function getByInstalacionAndFecha(req,res){
    const {id,fecha} = req.query
    if(!id){
        res.status(400).send("Se debe enviar un id")
        return
    }
    const reservas = await Reserva.find({instalacion:id,fecha:fecha},'horario')
    res.status(200).json(reservas)

}