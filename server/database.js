const { MongoClient, ServerApiVersion } = require("mongodb");
const { mongoURI, dbName, collectionName } = require("./config");

const client = new MongoClient(mongoURI, {
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
    process.exit(1); // Exit if connection fails
  }
}

const db = client.db(dbName);
const collection = db.collection(collectionName);

module.exports = { connectDB, collection };
