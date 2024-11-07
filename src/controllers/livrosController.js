import NotFoundError from "../errors/NotFoundError.js";
import { livros } from "../models/index.js";
import { processaBusca } from "./helpers.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;

      next();
    } catch(erro) {
      next(erro);
    }
  }

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultados = await livros.findById(id)
        .exec();

      if(livroResultados !== null) {
        res.status(200).send(livroResultados);
      } else {
        next(new NotFoundError("Id do Livro não localizado."));
      } 
    } catch (erro) {
      next(erro);
    }
  }

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  }

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroAtualizado = await livros.findByIdAndUpdate(id, { $set: req.body });

      if(livroAtualizado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NotFoundError("Id do Livro não localizado."));
      } 
    } catch (erro) {
      next(erro);
    }
  }

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if(livroResultado !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NotFoundError("Id do Livro não localizado."));
      } 
    } catch (erro) {
      next(erro);
    }
  }

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req);
      
      if(busca !== null) {
        const livrosResultado = livros
          .find(busca)
        
        req.resultado = livrosResultado;

        next()
      } else {
        res.status(200).send([]);
      }
      
    } catch (erro) {
      next(erro);
    }
  }

}

export default LivroController