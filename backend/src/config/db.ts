import mongoose from "mongoose";

// Connects to MongoDB Atlas using the connection string in MONGO_URI.
// Fails loudly (and exits) if the connection cannot be established, since
// nothing in the API can work without a database.
export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("MONGO_URI is not defined in your .env file");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", (error as Error).message);
    process.exit(1);
  }
};
