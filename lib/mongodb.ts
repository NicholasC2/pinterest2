import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

let client: MongoClient;

if (!(global as any)._mongoClient) {
  (global as any)._mongoClient = new MongoClient(uri);
}

client = (global as any)._mongoClient;

export default client;