import mongoose from 'mongoose';

// This constans can be configure on environment variables or docker as well
const MONGO_USERNAME = process.env.MONGO_USERNAME || 'root';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'example';
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'st-hiring-mongo-db';

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`,
      {
        authSource: 'admin',
      },
    );
    console.log('Connected to MongoDb');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;
