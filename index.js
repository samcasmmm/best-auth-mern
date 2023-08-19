// package imports
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// file imports
import connectDB from './config/database.js';
import {
  notFoundMiddleware,
  errorMiddleware,
} from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

// middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route
app.get('/', (req, res) => {
  res.json({
    status: 'Server is running',
    statusCode: res.statusCode,
  });
});

app.use('/api/v2/users', userRoutes);

// error middlewares

app.use(notFoundMiddleware);
app.use(errorMiddleware);

//  listening server
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
  }
  app.listen(process.env.PORT, () => {
    console.log(
      `${process.env.NODE_ENV} server on http://localhost:${process.env.PORT}`
    );
  });
};

startServer();
