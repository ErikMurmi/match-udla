import {dbConnect} from 'utils/mongoose'
import Instalacion from 'models/Instalacion'
import Reserva from 'models/Reserva'
import Desafio from 'models/Desafio'

dbConnect()

export default async function handler(req,res){
  const {method,body} = req
  const baseUrl = process.env.NEXT_PUBLIC_base_api_url

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
        const newReserva = new Reserva(body)
        const savedReserva = await newReserva.save()
        
        console.log('saved reserva', newReserva)
        if(savedReserva.desafio){
          console.log('crear deasafio')
          const newDesafio = 
            {
              horario:savedReserva.horario,
              usuario:savedReserva.usuario,
              reserva:savedReserva._id
            }
          console.log('desafio:',newDesafio)
          const response = await fetch(`${baseUrl}desafios`, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newDesafio),
          });
          console.log('response desafio:',response)
          if (response.ok){
            console.log('desafio creado', response.json())
          }
        }
        console.log('reserva creada creado', savedReserva)
        return res.status(201).json(savedReserva)
      }catch(error){
        return res.status(500).json({error: error.message})
      }
    default:
      return res.status(400).json({
        msg:'This method does not exits'
      })
  }
}