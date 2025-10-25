import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
if (!uri) throw new Error("Please add MONGODB_URI to your .env");

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Extend globalThis to store client promise
interface GlobalWithMongo {
  _mongoClientPromise?: Promise<MongoClient>;
}

const g = globalThis as unknown as GlobalWithMongo;

if (process.env.NODE_ENV === "development") {
  if (!g._mongoClientPromise) {
    client = new MongoClient(uri, options);
    g._mongoClientPromise = client.connect();
  }
  clientPromise = g._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
