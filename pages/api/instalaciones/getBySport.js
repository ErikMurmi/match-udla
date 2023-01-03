import Instalacion from "models/Instalacion"

export default async function getBySport(req,res){
    let instalaciones = []
    const {sport} = req.query
    if(!sport){
        res.status(400).send("Se debe enviar un deporte para el filtro")
        return
    }

    if(sport==="Todos"){
        instalaciones = await Instalacion.find()
    }else{
        instalaciones = await Instalacion.find({deporte:sport})
    }

   
    res.status(200).json(instalaciones)

}