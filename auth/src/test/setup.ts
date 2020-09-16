import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

// before all the differents tests start up a new instance of the mongodb memory server is created, this starts a new copy of mongodb
// in-memory that allows run multiple different test suits at the same time across different projects without them all trying to reach out to the same copy of mongo 
let mongo: any;
beforeAll(async () => {
  // starting up mongo memory server and connectign mongoose to it
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// before each test starts we are going to reach inside the mongodb database and delete all the data inside there
beforeEach(async () => {
  // obtaining all the different collections that exists
  const collections = await mongoose.connection.db.collections();

  // deleting all the data inside all collections
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// after we finish running all our different tests we stop the mongo db memory server and we disconnect mongoose from it as well 
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
})