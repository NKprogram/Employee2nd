import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the connection is reused across hot reloads.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri as string);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new connection.
  client = new MongoClient(uri as string);
  clientPromise = client.connect();
}

export default clientPromise;
