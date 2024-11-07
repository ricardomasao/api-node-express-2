import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import IncorrectRequisition from "../errors/IncorrectRequisition.js";
import ValidationError from "../errors/ValidationError.js";

const errorHandler = (
  erro, 
  req, 
  res, 
  next // eslint-disable-line no-unused-vars
) => {
  if(erro instanceof mongoose.Error.CastError) {
    new IncorrectRequisition().sendResponse(res);
  } else if( erro instanceof mongoose.Error.ValidationError) {
    new ValidationError(erro).sendResponse(res);
  }else if( erro instanceof BaseError) {
    erro.sendResponse(res);
  }else {
    new BaseError().sendResponse(res);
  }
}

export default errorHandler