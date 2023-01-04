import { deportes } from "utils/deportes"
import { useState, useEffect } from "react"
import { getDesafios } from "controllers/desafiosController"
import { DesafioCard } from "components/desafioCard"


export default function Desafios({Desafios}){

    const [listaDesafios,setlistaDesafios] = useState(Desafios)
    const [deporte,setDeporte] = useState("Todos")
    const [inicio,setInicio] = useState("")
    const [fin,setFin] = useState("")

    async function handleChange(e){
        const {value} = e.target
        const response = await fetch(`http://localhost:3000/api/desafios/getBySport?sport=${value}`,)
        const data = await response.json()
        setlistaDesafios(data)
    }

    // const saveTodo = async () => {
    //     const response = await fetch("/api/filterDateRange", {
    //     method: "POST",
    //     body: JSON.stringify(newTodo),
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     });
        
    //     const data = await response.json();
    //     settodos(data);
    // };

    const filterDesafios = async () => {
        const response = await fetch(`/api/desafios/filterDateRange?inicio=${inicio}&fin=${fin}&deporte=${deporte}`,);
        const data = await response.json();
        setlistaDesafios(data);
    };
    
    useEffect(()=>{
        console.log('inicio: ',inicio, " fin: ",fin, "deporte")
        filterDesafios()
    },[inicio,fin,deporte])


    return(
    <div className="page-container"> 
    <h1>Buscar un desafío</h1>
    <form id="horizontal-flex">
        <input type="date" name="inicio" onChange={(e)=>setInicio(new Date(e.target.value).toISOString().substring(0,10))}></input>
        <input type="date" name="fin" onChange={(e)=>setFin(new Date(e.target.value).toISOString().substring(0,10))} ></input>
        <select name="rango" id="rango">
        </select>
        <select name="deporte" id="deporte" onChange={(e)=>setDeporte(e.target.value)} defaultValue={'Todos'}>
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