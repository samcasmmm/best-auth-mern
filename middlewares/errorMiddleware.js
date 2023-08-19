const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultErrors = {
    statusCode: 500,
    message: err,
  };

  if (err.name === 'ValidationError') {
    defaultErrors.statusCode = 400;
    defaultErrors.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    defaultErrors.statusCode = 400;
    defaultErrors.message = 'Username or email already exists';
  }

  res.status(defaultErrors.statusCode).json(defaultErrors.message || err);
};

export default errorMiddleware;
