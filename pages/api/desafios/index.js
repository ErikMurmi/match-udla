import {dbConnect} from 'utils/mongoose'
import Desafio from 'models/Desafio'

dbConnect()

export default async function handler(req,res){
  const {method,body} = req

  switch(method){
    case "GET":
      try{
        const desafios = await Desafio.find()
        return res.status(200).json(desafios)
      }catch(error){
        return res.status(500).json({error: error.message})
      }
    case "POST":
      try{
        const newDesafio = new Desafio(body)
        const savedDesafio = await newDesafio.save()
        return res.status(201).json(savedDesafio)
      }catch(error){
        return res.status(500).json({error: error.message})
      }
    default:
      return res.status(400).json({
        msg:'This method does not exits'
      })
  }
}