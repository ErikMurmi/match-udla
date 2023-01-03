import { useState } from "react"
import { addInstalacion } from "controllers/instalacionesController"
import { useRouter } from "next/router"

export default function addNewInstalacion(){

    const router = useRouter()
    
    const deportes = ['Seleccione...','Fútbol','Basquet','Voley','Tennis']
    const defaultHorarios = {
        lun_vie:{
            inicio:"",
            fin:""
        },
        finde:{
            inicio:"",
            fin:""
        },
        feriado:{
            inicio:"",
            fin:""
        }
    }
    const defaultNewInstalacion = {
        titulo:"",
        deporte:"",
        precio:"",
        direccion:"",
        descripcion:"",
    }
    const [horarios,setHorarios] = useState(defaultHorarios)
    const [newInstalacion,setNewInstalacion] = useState({
        titulo:"",
        deporte:"",
        precio:"",
        direccion:"",
        descripcion:"",
    })

    function clearValues(){
        setHorarios(defaultHorarios)
        setNewInstalacion(defaultNewInstalacion)
    }

    const handleChange = (e) => {
        const { value, name } = e.target
        setNewInstalacion({ ...newInstalacion, [name]: value })
    }

    const handleHorarios = (e)=>{
        const {value,name} = e.target
        switch(name){
            case 'inicio_lun_vie':
                setHorarios({ ...horarios, ['lun_vie']: {['fin']:horarios.lun_vie.fin,['inicio']:value} })
                break
            case 'fin_lun_vie':
                setHorarios({ ...horarios, ['lun_vie']: {['inicio']:horarios.lun_vie.inicio,['fin']:value} })
                break
            case 'inicio_finde':
                setHorarios({ ...horarios, ['finde']: {['fin']:horarios.finde.fin,['inicio']:value} })
                break
            case 'fin_finde':
                setHorarios({ ...horarios, ['finde']: {['inicio']:horarios.finde.inicio,['fin']:value} })
                break
            case 'inicio_feriado':
                setHorarios({ ...horarios, ['feriado']: {['fin']:horarios.feriado.fin,['inicio']:value} })
                break
            case 'fin_feriado':
                setHorarios({ ...horarios, ['feriado']: {['inicio']:horarios.feriado.inicio,['fin']:value} })
                break

        }
        // setHorarios({ ...horarios, [name]: value })
    }

    const handleSubmit =async(form) =>{
        form.preventDefault()
        const newIns = {...newInstalacion,horarios}
        console.log(newIns)
        let result = await addInstalacion(newIns)
        console.log(result)
        if(!result.ok){
            alert("Campos inválidos, revisa los valores ingresados")
        }else{
            await router.push('/')
        }
        //console.log(horarios)
    }

    return(
        <div>
            <form id="addInstalacion" onSubmit={handleSubmit}>
                <div id="vertical-flex">
                    <label htmlFor="titulo">Título</label>
                    <input type="text" onChange={handleChange} name="titulo"/>
                    <label htmlFor="deporte">Deporte</label>
                    <select name="deporte" id="deporte" onChange={handleChange} defaultValue={'Seleccione...'}
                            >
                            {deportes.map((deporte,index) => (
                                <option key={index} value={deporte}>{deporte}</option>
                            ))}
                    </select>
                    <label htmlFor="precio">Precio/Hora</label>
                    <input type="number" onChange={handleChange} required name="precio" min="0" defaultValue="0" step=".01"/>
                    <label htmlFor="direccion">Dirección</label>
                    <input type="text" onChange={handleChange} name="direccion"/>
                    <label htmlFor="descripcion" onChange={handleChange}>Descripción</label>
                    <textarea id="descripcion" onChange={handleChange} name="descripcion"></textarea>
                </div>
                <div id="vertical-flex">
                    <h4>Horarios</h4>
                    <label>Lunes a viernes</label>
                    <div id="horizontal-flex">
                        <input type="time" onChange={handleHorarios} name="inicio_lun_vie"/>
                        <p> a </p>
                        <input type="time" onChange={handleHorarios} name="fin_lun_vie"/>
                    </div>
                    <label>Fin de semana</label>
                    <div id="horizontal-flex">
                        <input type="time" onChange={handleHorarios} name="inicio_finde"/>
                        <p> a </p>
                        <input type="time" onChange={handleHorarios} name="fin_finde"/>
                    </div>
                    <label>Feriados</label>
                    <div id="horizontal-flex">
                        <input type="time"  onChange={handleHorarios} name="inicio_feriado"/>
                        <p> a </p>
                        <input type="time" onChange={handleHorarios} name="fin_feriado"/>
                    </div>    
                </div>

            </form>
            <input type="submit" form="addInstalacion" value="Guardar"/>
            <input type="reset" form="addInstalacion" onClick={clearValues} value="Borrar valores"></input>
        </div>
    )
}