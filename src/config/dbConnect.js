import mongoose from "mongoose"

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING
console.log(DB_CONNECTION_STRING)
mongoose.connect(DB_CONNECTION_STRING);

let db = mongoose.connection;

export default db;