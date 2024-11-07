import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {type: String, required: [true, "O campo título é obrigatório"]},
    autor: {type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "O campo autor é obrigatório"], autopopulate: true},
    editora: {
      type: String, 
      required: [true, "O campo editora é obrigatório"],
      enum: {
        values: [
          "HarperCollins Brasil", 
          "Companhia das Letras", 
          "Intrínseca", 
          "L&PM", 
          "Companhia das Letras", 
          "Arqueiro", 
          "Rocco", 
          "Martin Claret", 
          "Zahar", 
          "Objetiva", 
          "Outra"
        ],
        message: "A editora {VALUE} não é válida"
      }
    },
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (value) => {
          return value >= 10 && value <= 5000;
        },
        message: "O campo número de páginas deve ser um valor entre 10 e 5000. Valor informado: {VALUE}"
      }
    }
  }
);

livroSchema.plugin(autopopulate);
const livros= mongoose.model("livros", livroSchema);

export default livros;