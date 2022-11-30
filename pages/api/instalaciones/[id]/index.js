import { dbConnect } from "utils/mongoose"
import Instalacion from "models/Instalacion"

dbConnect()

export default async(req,res) =>
{
    const {method,body,query} = req
    //console.log(query)
    switch(method){
        case "GET":
            try{
                const instalacion = await Instalacion.findById(query.id)
                if(!instalacion) return res.status(400).json({msg: "Instalacion not found"})
                return res.status(200).json(instalacion)
            }catch(error){
                return res.status(500).json({msg:error.message})
            }  
        case "PUT":
            try{
                const instalacion = await Instalacion.findByIdAndUpdate(query.id,body,{
                    new:true
                })
                console.log("edit instalacion api ",body)
                if (!instalacion) return res.status(404).json({msg: "Instalacion not found"})
                return res.status(200).json(instalacion)
            }catch(error){
                return res.status(500).json({msg:error.message})
            }
        case "DELETE":
            try{
                const deletedInstalacion = await Instalacion.findByIdAndDelete(id)
                if (!deletedInstalacion) 
                    return res.status(404).json({msg: "Instalacion not found"})
                return res.status(204).json()
            }catch(error){
                return res.status(400).json({msg: error.message})
            }
        default:
            return res.status(400).json({msg:"This method is not available"})
    }
}