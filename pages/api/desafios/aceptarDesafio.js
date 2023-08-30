import Desafio from "models/Desafio"
import { dbConnect } from "utils/mongoose"

dbConnect()

export default async function aceptarDesafio(req,res){
    console.log('body',req.body)
    const {id,adversario} = req.body
    if(!id){
        res.status(400).send("Se debe enviar el id del desafio")
        return
    }
    const desafio = await Desafio.findOneAndUpdate({id:id},{adversario:adversario,resultado:'Por definir'},{new: true})
    
    res.status(200).json(desafio)

}