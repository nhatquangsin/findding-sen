import mongoose from "mongoose";
import config from "../config";

mongoose.Promise = global.Promise;

const connectToDb = async () => {
  try {
    await mongoose.connect(
      config.mongoUrl,
      { useNewUrlParser: true }
    );
  } catch (err) {
    console.log(err);
  }
};

export default connectToDb;
