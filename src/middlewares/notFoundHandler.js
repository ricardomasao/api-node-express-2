import NotFoundError from "../errors/NotFoundError.js"

const notFoundHandler = (
  req, 
  res, 
  next  
) => {
  const notFound = new NotFoundError();
  next(notFound);
}

export default notFoundHandler