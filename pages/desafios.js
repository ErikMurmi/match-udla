import { deportes } from "utils/deportes"
import { useState } from "react"
import { getDesafios } from "controllers/desafiosController"
import { DesafioCard } from "components/desafioCard"


export default function Desafios({Desafios}){

    const [listaDesafios,setlistaDesafios] = useState(Desafios)
    async function handleChange(e){
        const {value} = e.target
        const response = await fetch(`http://localhost:3000/api/desafios/getBySport?sport=${value}`,)
        const data = await response.json()
        setlistaDesafios(data)
    }


    return(
    <div className="page-container"> 
    <h1>Buscar un desafío</h1>
    <form id="horizontal-flex">
        <input type="date" name="inicio"></input>
        <input type="date" name="fin"></input>
        <select name="rango" id="rango">
        </select>
        <select name="deporte" id="deporte" onChange={handleChange} defaultValue={'Todos'}>
            <option key={0} value={'Todos'}>{'Todos'}</option>
            {deportes.map((deporte,index) => (
                <option key={index} value={deporte}>{deporte}</option>
            ))}
        </select>
    </form>
    <div id="horizontal-flex" className="cards-container" >
        {listaDesafios.map((desafio,index)=>(
            <DesafioCard key={index} desafio={desafio} clicked={()=>console.log('clicked')}>
            </DesafioCard>
        ))}
    </div>

    </div>)
}

export const getServerSideProps = async()=>{
    const desafios = await getDesafios()
    console.log(desafios)
    return{
        props:{
            Desafios:desafios
        }
    }
}