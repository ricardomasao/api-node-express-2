import IncorrectRequisition from "../errors/IncorrectRequisition.js";

async function paginate(req, res, next) {
  try {
    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;
    let [campoOrdenacao, ordem] = ordenacao.split(":");

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const { resultado } = req;

    if(limite > 0 && pagina > 0) {
      const resultadoPaginado = await resultado
        .sort({[campoOrdenacao]: ordem})
        .skip((pagina - 1) * limite)
        .limit(limite)
        .exec();

      res.status(200).json(resultadoPaginado);
    } else {
      next(new IncorrectRequisition())
    }
  } catch (error) {
    next(error);
  }
}

export default paginate;