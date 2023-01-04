import User from "models/User"

export default async function Signin(req,res){
    const body = req.body
    const email = body.email
    console.log(body.email)
    console.log("Holi")
    // if(!sport){
    //     res.status(400).send("Se debe enviar un deporte para el filtro")
    //     return
    // }

    // if(sport==="Todos"){
    //     instalaciones = await Instalacion.find()
    // }else{
    //     instalaciones = await Instalacion.find({deporte:sport})
    // }
    const user = await User.findOne({email:email})
   
    res.status(200).json(user)
    
}