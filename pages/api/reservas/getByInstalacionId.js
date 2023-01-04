import Reserva from "models/Reserva"

export default async function getByInstalacionId(req,res){
    const {id} = req.query
    if(!id){
        res.status(400).send("Se debe enviar un id")
        return
    }
    const reservas = await Reserva.find({instalacion:id})
    res.status(200).json(reservas)

}