import mongoose from 'mongoose';

const connectDB = async (url) => {
  mongoose.set('strictQuery', true);
  await mongoose
    .connect(url)
    .then(() => {
      console.log('MongoDB Connected');
    })
    .catch((error) => {
      console.log('MongoDB error', error);
      process.exit(1);
    });
};

export default connectDB;
