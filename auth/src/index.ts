import mongoose from "mongoose";
import { app } from './app';

const start = async () => {

  // adding a check to make sure that the environment variable is actually defined
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to mongoDb');
  } catch (err) {
    console.error(err)
  }

  app.listen(3000, () => {
    console.log("Auth service listening on port 3000!");
  });
}

start();

