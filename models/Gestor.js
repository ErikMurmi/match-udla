import { Schema,model,models } from "mongoose";
 
const gestorSchema = new Schema({
    nombres:{type:String,required: [true, 'Los nombres son requeridos']},
    apellidos:{type:String,required: [true, 'Los apellidos son requeridos']},
    cedula:{type:String,validate: {
        validator: function(validarCedula) {
            let aux = 0, par = 0, impar = 0, verifi;
            for (let i = 0; i < 9; i += 2)
            {
                aux = 2 * parseInt(validarCedula[i]);
                if (aux > 9)
                    aux -= 9;
                par += aux;
            }
            for (let i = 1; i < 9; i += 2)
            {
                impar += parseInt(validarCedula[i]);
            }

            aux = par + impar;
            if (aux % 10 != 0)
            {
                verifi = 10 - (aux % 10);
            }
            else
                verifi = 0;
            if (verifi == parseInt(validarCedula[9]))
                return true;
            else
                return false;
        },
        message: props => `${props.value} no es una cedula válida!`
      },
      required: [true, 'La cédula es requerida']
    },
    numero:{type:String,validate: {
        validator: function(v) {
          return /^[0][9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      required: [true, 'User phone number required']
    },
    email:{type:String,validate: {
        validator: function(v) {
          return  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
        },
        message: props => `${props.value} no es un correo válido!`
      },
      required: [true, 'Email requerido'],unique:true},
    clave:{type:String,required:true},
    tipo: Number
},{
    timestamps:true,
    versionKey:false
})

export default models.Gestor || model('Gestor',gestorSchema)