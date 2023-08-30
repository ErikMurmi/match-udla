import User from "models/User"
import { dbConnect } from "utils/mongoose"

dbConnect()
export default async function getByFirebaseId(req,res){
    
    const {firebase} = req.query
    if(!firebase){
        res.status(400).send("Se debe enviar el id de firebase")
        return
    }
    let user = await User.findOne({'firebaseId':firebase})
   
    res.status(200).json(user)
    
}