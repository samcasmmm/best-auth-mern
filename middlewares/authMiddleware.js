import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userSchema.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decoded.userId).selected('-password');
      next();
    } catch (error) {
      res.status(401);
      next({
        message: 'Not authorized, invalid token',
        status: 'Bad request',
      });
    }
  } else {
    res.status(401);
    next({
      message: 'Not authorized, No token',
      status: 'Bad request',
    });
  }
});
// const authMiddleware = (err, req, res, next) => {};

export { authMiddleware };
