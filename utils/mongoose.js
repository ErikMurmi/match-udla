import {connect,connection} from "mongoose";

const dbState = {
    isConnected : false
}

function handleError(error){
    console.log(error)
}

export async function dbConnect(){
    if (!dbState.isConnected){
        const db = await connect(process.env.DB_URL).catch(error => handleError(error))
        dbState.isConnected = db.connections[0].readyState
        console.log(db.connection.db.databaseName)
    }
    
}

connection.on("connected",()=>{
    console.log("Db connected");
})

connection.on("error",(err)=>{
    console.log(err);
})