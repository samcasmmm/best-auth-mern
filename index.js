// package imports
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// file imports
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import authMiddleware from './middlewares/authMiddleware.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

// middleware
const app = express();
app.use(express.json());

// route
app.get('/', (req, res) => {
  res.json({
    status: 'Server is running',
    statusCode: res.statusCode,
  });
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(errorMiddleware);
// listening server
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
