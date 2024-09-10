const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

const db = client.db(process.env.DATABASE_NAME);
const collection = db.collection(process.env.COLLECTION_NAME);

module.exports = { connectDB, collection };
