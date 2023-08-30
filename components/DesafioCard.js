
export const DesafioCard=({desafio,clicked})=>{
    return(
    <div className="instalacion-container" style={{"width":"100%"}} >
        <h2>{desafio.usuario}</h2>
        <p>{desafio._id}</p>
        <p>{JSON.stringify(desafio.horario)}</p>
        <button onClick={clicked} >Aceptar Desafio</button>
    </div>)
}   