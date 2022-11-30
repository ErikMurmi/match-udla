export const Desafio = ({desafio})=>{
    return(
        <div className="desafio-container">
            <p>{`Inicio:${desafio.horario[0].inicio}`}</p>
            <p>{`Fin:${desafio.horario[desafio.horario.length-1].fin}`}</p>
        </div>
    )
}