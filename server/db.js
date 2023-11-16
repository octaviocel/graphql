import mongoose from "mongoose";

// top level await 16>
// private key 5b44692c-568d-49b1-b769-16ac813c9456

export const connectDB = async() =>{
    try {

        console.log(`MonogDB Connect: ${conn.connection.name}`)
    } catch (error) {
        console.log(`Error DB Connection: ${error.message}`)
        process.exit(1)
    }

}