import { Schema,model,models } from "mongoose";
 
const userSchema = new Schema({
    nombre:String,
    apellido:String,
    email:{type:String,required:true,unique:true},
    firebaseId:{type:String,required:true},
    fechaNacimiento:Date,
    password:{type:String,required:true},
    tipo: Number
},{
    timestamps:true,
    versionKey:false
})

export default models.User || model('User',userSchema)