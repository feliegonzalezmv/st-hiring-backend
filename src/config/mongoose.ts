import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://root:example@localhost:27017/st-hiring-mongo-db', {
      authSource: 'admin',
    });
    console.log('Connected to MongoDb');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
