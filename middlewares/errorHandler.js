// función que nos hará llegar a un middleware de tipo error:
function logErrors(err, req, resp, next) {
  console.error(err); //mostrar el error en servidor para poder monitorearlo
  next(err);
  //importante para saber que se esta enviando a un middleware de tipo error,
  //si no tiene el error dentro entonces se esta mandando a uno normal por asi decirlo
}
// Crear formato para devolverlo al cliente que se complementa con la función anterior:
function errorHandler(err, req, resp, next) {
  resp.status(500).json({
    //error es estatus 500 Internal Server Error
    message: err.message,
    stack: err.stack,
  });
}
//así no se utilice next en el código se debe poner aqui,
//ya que un middleware de error tiene los cuatro parámetros
module.exports = { logErrors, errorHandler };
