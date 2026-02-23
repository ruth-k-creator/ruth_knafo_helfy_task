function errorMiddleware(err, req, res, next) {
  const status = err.status || 500;

  res.status(status).json({
    error: err.error || "Internal Server Error"
  });
}
module.exports = errorMiddleware;