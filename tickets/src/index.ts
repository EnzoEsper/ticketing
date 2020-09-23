import mongoose from "mongoose";
import { app } from './app';

const start = async () => {

  // adding a check to make sure that the environment variable is actually defined
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  // check to make sure that the mongo uri string is defined
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to mongoDb');
  } catch (err) {
    console.error(err)
  }

  app.listen(3000, () => {
    console.log("Ticket service listening on port 3000!");
  });
}

start();

