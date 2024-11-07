import { autores } from "../models/index.js";

export const processaBusca = async (params) => {
  const { editora, titulo, numeroPaginas, minPaginas, maxPaginas, nomeAutor } = params.query;

  let busca = {}
  if(editora) busca.editora = editora;
  if(titulo) busca.titulo = { $regex: titulo, $options: "i" };
  // if(titulo) busca.titulo = new RegExp(titulo, "i");

  if(numeroPaginas || minPaginas || maxPaginas) busca.numeroPaginas = {};
  if(numeroPaginas) busca.numeroPaginas = { ...busca.numeroPaginas, $gte: numeroPaginas };
  if(minPaginas) busca.numeroPaginas = { ...busca.numeroPaginas, $gte: minPaginas };
  if(maxPaginas) busca.numeroPaginas = { ...busca.numeroPaginas, $lte: maxPaginas };
  if(nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });
    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
    
  }

  return busca;
}