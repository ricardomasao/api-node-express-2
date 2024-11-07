import IncorrectRequisition from "./IncorrectRequisition.js";

class ValidationError extends IncorrectRequisition {
  constructor(erro) {
    const errorMessages = Object.values(erro.errors).map((errorItem) => errorItem.message).join("; ");
    
    super(`Os seguintes erros foram encontrados: ${errorMessages}`);
  }
}

export default ValidationError;