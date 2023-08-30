export default function Solicitud({ show }) {


    return (
        <form className="solicitud-form">
            <h3>SOLICITUD</h3>
            <p>Completa la información necesaria</p>
            <label>Nombre Completo</label>
            <input type="text" placeholder="Nombres y Apellidos"></input>
            <label>Correo institucional</label>
            <input type="email" placeholder="example@udla.edu.ec"></input>
            <label>ID Banner/Cedula</label>
            <input type="text" placeholder="ej. A000111"></input>
            <label>Carrera </label>
            <input type="text" placeholder="ej. Medicina"></input>
            <label>Motivo</label>
            <textarea placeholder="ej.Jugar fútbol" type="text"></textarea>
            <div className="options-row">
                <button className="cancelar-btn-modal"
                    onClick={() => (show(false))}> Cancelar</button>
                <button type="submit" className="reservar-btn-modal"
                    onClick={() => (show(false))}>Enviar</button>
            </div>

        </form>
    )
}