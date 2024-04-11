import mongoose from "mongoose";
import colors from "colors";
import { exit } from "process";

export const connectDB = async () => {
  try {
    const {connection} = await mongoose.connect(process.env.DATABASE_URL);
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.green.bold(`MongoDB connected: ${url}`));
  } catch (error) {
    console.log(colors.red.bold('Error connecting to MongoDB'));
    // console.log(colors.red.bold(error.message));
    exit(1);
  }
};
