import mongoose from 'mongoose';

const connectDB = async (url) => {
  mongoose.set('strictQuery', true);
  mongoose
    .connect(url)
    .then(() => {
      console.log('MongoDB Connected');
    })
    .catch((error) => {
      console.log('MongoDB error', error);
    });
};

export default connectDB;
