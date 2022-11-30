import {dbConnect} from 'utils/mongoose'
import Instalacion from 'models/Instalacion'

dbConnect()

export default async function handler(req,res){
  const {method,body} = req

  switch(method){
    case "GET":
      try{
        const instalaciones = await Instalacion.find()
        return res.status(200).json(instalaciones)
      }catch(error){
        return res.status(500).json({error: error.message})
      }
    case "POST":
      try{
        const newInstalacion = new Instalacion(body)
        const savedInstalacion = await newInstalacion.save()
        return res.status(201).json(savedInstalacion)
      }catch(error){
        return res.status(500).json({error: error.message})
      }
    default:
      return res.status(400).json({
        msg:'This method does not exits'
      })
  }
}