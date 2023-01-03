import { Schema,model,models } from "mongoose";
import mongoose from "mongoose";
 
const desafioSchema = new Schema({
    horario:{type:Array,validate:{ validator: function(v) {
        return v.length>0;
    },},required:[true,'Se debe tener un horario']},
    usuario:{type:mongoose.ObjectId,required: [true, 'Se debe tener un usuario']},
    adversario:{type:mongoose.ObjectId},
    reserva:{type:mongoose.ObjectId}
},{
    timestamps:true,
    versionKey:false
})

export default models.Desafio || model('Desafio',desafioSchema,'desafios')