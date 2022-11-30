import { Schema,model,models } from "mongoose";
 
const reservaSchema = new Schema({
    horario:{type:Array,validate:{ validator: function(v) {
        return v.length>0;
    },},required:[true,'Se debe tener un horario']},
    abierta:{type:Boolean,required:true},
    usuario:{type:mongoose.ObjectId,required: [true, 'Se debe tener un usuario']},
    adversario:{type:mongoose.ObjectId},
},{
    timestamps:true,
    versionKey:false
})

export default models.Reserva || model('Reserva',reservaSchema,'reservas')