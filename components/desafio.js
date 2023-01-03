export const Desafio = ({desafio})=>{
    return(
        <div className="desafio-item">
            <p>{`Inicio:${desafio.horario[0].inicio}`}</p>
            <p>{`Fin:${desafio.horario[desafio.horario.length-1].fin}`}</p>
            <label htmlFor="local">L</label>
            <input type="number" name="local"></input>
            <p>-</p>
            <label htmlFor="visitante" >V</label>
            <input type="number" name="visitante"></input>
            <button>Registrar Resultado</button>
            <button>Cancelar</button>
        </div>
    )
}