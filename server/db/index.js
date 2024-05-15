import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Conncted to MongoDB");
  } catch (error) {
    console.error("ERROR IN CONNECTING TO MONGODB: ", error);
  }
};

export default connectToDb;
