
export const DesafioCard=({desafio,clicked})=>{
    return(
    <div className="instalacion-container" style={{"width":"100%"}} onClick={clicked}>
        <h2>{desafio.usuario}</h2>
        <p>{desafio._id}</p>
        <p>{JSON.stringify(desafio.horario)}</p>
        <button>Aceptar Desafio</button>
    </div>)
}   