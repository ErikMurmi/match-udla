import { Schema,model,models } from "mongoose";
 
const instalacionSchema = new Schema({
    titulo:{type:String,required:[true,'Se debe tener una título']},
    deporte:{type:String,required: [true, 'Los nombres son requeridos']},
    precio:{type:Number,min:0.0,required: [true, 'Los apellidos son requeridos']},
    direccion:{type:String, required:[true,'Se debe tener la direccion']},
    descripcion:{type:String,required:[true,'Se debe tener una descripcion']},
    horarios:{
        lun_vie:{
            inicio:{type:String,required:[true,'Inicio de horario intersemanal requerido']},
            fin:{type:String,required:[true,'Fin de horario intersemanal requerido']}
        },
        finde:{
            inicio:{type:String,required:[true,'Inicio de horario de finde requerido']},
            fin:{type:String,required:[true,'Fin de horario de finde requerido']}
        },
        feriado:{
            inicio:{type:String,required:[true,'Inicio de horario de feriado requerido']},
            fin:{type:String,required:[true,'Fin de horario de feriado requerido']}
        }
    },
    reservas:{type:Array}
},

{
    timestamps:true,
    versionKey:false
})

export default models.Instalacion || model('Instalacion',instalacionSchema,'instalaciones')