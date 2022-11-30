import { getInstalaciones } from "controllers/instalacionesController"
import mongoose from "mongoose"

export default function Home({Instalaciones}){

    // const instalaciones = (async () => await getInstalaciones())()
    // console.log(instalaciones)
    // function deleteAll(){
    //     mongoose.connections.forEach(connection => {
    //         const modelNames = Object.keys(connection.models)
          
    //         modelNames.forEach(modelName => {
    //           delete connection.models[modelName]
    //         })
          
    //         const collectionNames = Object.keys(connection.collections)
    //         collectionNames.forEach(collectionName => {
    //           delete connection.collections[collectionName]
    //         })
    //       })
          
    //       const modelSchemaNames = Object.keys(mongoose.modelSchemas)
    //       modelSchemaNames.forEach(modelSchemaName => {
    //         delete mongoose.modelSchemas[modelSchemaName]
    //       })
    // }
    const ins = JSON.stringify(Instalaciones)

    return(
        <div>
            <button>
                Borrar modelo
            </button>
            <div className="instalacion-card">{ins}</div>
        </div>
    )
}

export const getServerSideProps = async()=>{
    const instalaciones = await getInstalaciones()
    console.log(instalaciones)
    return{
        props:{
            Instalaciones:instalaciones
        }
    }
}