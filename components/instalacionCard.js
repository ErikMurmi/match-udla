
export const InstalacionCard=({instalacion,clicked})=>{
    return(
    <div className="instalacion-container" style={{"width":"100%"}} onClick={clicked}>
        <h2>{instalacion.titulo}</h2>
        <p>{instalacion.deporte}</p>
        <p>{instalacion.precio}</p>
        <p>{instalacion.direccion}</p>
        <h5>Lun-Vie</h5>
        <p>{`${instalacion.horarios.lun_vie.inicio}-${instalacion.horarios.lun_vie.fin}`}</p>
        <h5>Fin de semana</h5>
        <p>{`${instalacion.horarios.finde.inicio}-${instalacion.horarios.finde.fin}`}</p>
        <h5>Feriados</h5>
        <p>{`${instalacion.horarios.feriado.inicio}-${instalacion.horarios.feriado.fin}`}</p>
    </div>)
}   