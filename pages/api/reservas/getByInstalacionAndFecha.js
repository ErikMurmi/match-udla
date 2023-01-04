import Reserva from "models/Reserva"

export default async function getByInstalacionAndFecha(req,res){
    console.log('query ', req.query)
    const {id,fecha} = req.query
    if(!id){
        res.status(400).send("Se debe enviar un id")
        return
    }
    const reservas = await Reserva.find({instalacion:id,fecha:fecha},'horario')
    res.status(200).json(reservas)

}