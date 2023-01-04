import { Schema,model,models } from "mongoose";
import mongoose from "mongoose";
 
const reservaSchema = new Schema({
    horario:{type:Array,validate:{ validator: function(v) {
        return v.length>0;
    },},required:[true,'Se debe tener un horario']},
    fecha:{type:Date,required:[true,'Se debe tener una fecha']},
    usuario:{type:mongoose.ObjectId,required: [true, 'Se debe tener un usuario']},
    instalacion:{type:mongoose.ObjectId,required: [true, 'Debe tener una instalacion']},
    desafio:{type:Boolean,required:[true,'Se debe saber si esta abierta a desafio o no']},
},{
    timestamps:true,
    versionKey:false
})

export default models.Reserva || model('Reserva',reservaSchema,'reservas')