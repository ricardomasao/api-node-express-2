import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"
import errorHandler from "./middlewares/errorsHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

db.on("error", console.log.bind(console, "Erro de conexão"))
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso")
})

const app = express();
app.use(express.json())
routes(app);

app.use(notFoundHandler)

app.use(errorHandler) 

export default app