import { dbConnect } from "utils/mongoose"
import Gestor from 'models/Gestor'

dbConnect()

export default async(req,res) =>
{
    const {method,body,query:{id}} = req
    switch(method){
        case "GET":
            try{
                const gestor = await Gestor.findById(id)
                if(!gestor) return res.status(400).json({msg: "Gestor not found"})
                return res.status(200).json(gestor)
            }catch(error){
                return res.status(500).json({msg:error.message})
            }  
        case "PUT":
            try{
                const gestor = await Gestor.findByIdAndUpdate(id,body,{
                    new:true
                })
                console.log("edit gestor api ",body)
                if (!gestor) return res.status(404).json({msg: "Gestor not found"})
                return res.status(200).json(gestor)
            }catch(error){
                return res.status(500).json({msg:error.message})
            }
        case "DELETE":
            try{
                const deletedGestor = await Gestor.findByIdAndDelete(id)
                if (!deletedGestor) 
                    return res.status(404).json({msg: "Gestor not found"})
                return res.status(204).json()
            }catch(error){
                return res.status(400).json({msg: error.message})
            }
        default:
            return res.status(400).json({msg:"This method is not available"})
    }
}